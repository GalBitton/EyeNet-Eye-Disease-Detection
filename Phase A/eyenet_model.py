# Import necessary libraries
import os
import random
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import (Input, Dense, Dropout, GlobalAveragePooling2D, Concatenate, Conv2D,
                                     Multiply, Reshape, BatchNormalization, MaxPooling2D)
from tensorflow.keras.applications import DenseNet121
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import Adam
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import cv2

# Set random seeds for reproducibility
def set_seed(seed=42):
    random.seed(seed)
    np.random.seed(seed)
    tf.random.set_seed(seed)

# Spatial Attention Layer
def spatial_attention(inputs):
    avg_pool = tf.reduce_mean(inputs, axis=-1, keepdims=True)
    max_pool = tf.reduce_max(inputs, axis=-1, keepdims=True)
    concat = Concatenate(axis=-1)([avg_pool, max_pool])
    attention = Conv2D(1, (7, 7), padding="same", activation="sigmoid")(concat)
    return Multiply()([inputs, attention])

# Channel Attention Layer
def channel_attention(inputs):
    attention = GlobalAveragePooling2D()(inputs)
    attention = Dense(inputs.shape[-1] // 8, activation="relu")(attention)
    attention = Dense(inputs.shape[-1], activation="sigmoid")(attention)
    attention = Reshape((1, 1, inputs.shape[-1]))(attention)
    return Multiply()([inputs, attention])

# Improved DenseNet121 Model with Attention Layers
def build_improved_densenet(input_shape=(224, 224, 3), num_classes=4):
    base_model = DenseNet121(include_top=False, weights="imagenet", input_shape=input_shape)
    base_model.trainable = False  # Freeze the base model

    inputs = Input(shape=input_shape)
    x = base_model(inputs, training=False)

    # Add attention mechanisms
    x = channel_attention(x)
    x = spatial_attention(x)

    # Global Average Pooling
    x = GlobalAveragePooling2D()(x)

    # Fully connected layers
    x = Dense(256, activation="relu")(x)
    x = Dropout(0.5)(x)
    x = Dense(128, activation="relu")(x)
    x = Dropout(0.5)(x)

    # Output layer
    outputs = Dense(num_classes, activation="softmax")(x)

    model = Model(inputs, outputs)
    return model

# Data Generators
def create_generators(train_dir, val_dir, test_dir, target_size=(224, 224), batch_size=32):
    train_datagen = ImageDataGenerator(
        rescale=1.0 / 255,
        rotation_range=15,
        width_shift_range=0.1,
        height_shift_range=0.1,
        zoom_range=0.2,
        horizontal_flip=True,
        brightness_range=[0.8, 1.2]
    )

    val_test_datagen = ImageDataGenerator(rescale=1.0 / 255)

    train_generator = train_datagen.flow_from_directory(
        train_dir,
        target_size=target_size,
        batch_size=batch_size,
        class_mode="categorical"
    )

    val_generator = val_test_datagen.flow_from_directory(
        val_dir,
        target_size=target_size,
        batch_size=batch_size,
        class_mode="categorical"
    )

    test_generator = val_test_datagen.flow_from_directory(
        test_dir,
        target_size=target_size,
        batch_size=batch_size,
        class_mode="categorical",
        shuffle=False
    )

    return train_generator, val_generator, test_generator

# Train the Model
def train_model(model, train_generator, val_generator, epochs=20, learning_rate=0.0001):
    model.compile(optimizer=Adam(learning_rate=learning_rate),
                  loss="categorical_crossentropy",
                  metrics=["categorical_accuracy"])

    history = model.fit(train_generator, epochs=epochs, validation_data=val_generator)
    return history

# Fine-Tune the Model
def fine_tune_model(model, train_generator, val_generator, fine_tune_epochs=10, fine_tune_lr=1e-5):
    model.trainable = True  # Unfreeze the entire model
    model.compile(optimizer=Adam(learning_rate=fine_tune_lr),
                  loss="categorical_crossentropy",
                  metrics=["categorical_accuracy"])
    history_fine = model.fit(train_generator, epochs=fine_tune_epochs, validation_data=val_generator)
    return history_fine

# Evaluate the Model
def evaluate_model(model, test_generator):
    test_loss, test_acc = model.evaluate(test_generator)
    print(f"Test Accuracy: {test_acc * 100:.2f}%")

    y_true = test_generator.classes
    y_pred = np.argmax(model.predict(test_generator), axis=1)
    print(classification_report(y_true, y_pred, target_names=test_generator.class_indices.keys()))

    cm = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(6, 6))
    plt.imshow(cm, cmap="Blues")
    plt.title("Confusion Matrix")
    plt.colorbar()
    plt.xlabel("Predicted")
    plt.ylabel("Actual")
    plt.show()

# Plot Training History
def plot_history(history):
    plt.figure(figsize=(12, 4))
    plt.subplot(1, 2, 1)
    plt.plot(history.history["categorical_accuracy"], label="Training Accuracy")
    plt.plot(history.history["val_categorical_accuracy"], label="Validation Accuracy")
    plt.legend()
    plt.title("Accuracy Over Epochs")

    plt.subplot(1, 2, 2)
    plt.plot(history.history["loss"], label="Training Loss")
    plt.plot(history.history["val_loss"], label="Validation Loss")
    plt.legend()
    plt.title("Loss Over Epochs")
    plt.show()

# Main Function
def main():
    set_seed()

    # Define dataset paths
    dataset_path = r"C:\Users\User\Desktop\Diseases\Dataset"
    train_dir = os.path.join(dataset_path, "train")
    val_dir = os.path.join(dataset_path, "val")
    test_dir = os.path.join(dataset_path, "test")

    # Create data generators
    train_generator, val_generator, test_generator = create_generators(train_dir, val_dir, test_dir)

    # Build model
    model = build_improved_densenet()

    # Train model
    history = train_model(model, train_generator, val_generator)
    plot_history(history)

    # Fine-tune model
    history_fine = fine_tune_model(model, train_generator, val_generator)
    plot_history(history_fine)

    # Evaluate model
    evaluate_model(model, test_generator)

    # Save model
    model.save("analeyes_improved_densenet.h5")
    print("Model saved as analeyes_improved_densenet.h5")

if __name__ == "__main__":
    main()
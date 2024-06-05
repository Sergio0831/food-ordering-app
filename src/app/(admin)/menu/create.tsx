import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/src/constants/Colors';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Button from '@/src/components/Button';
import {
  useCreateProduct,
  useDeleteProduct,
  useProduct,
  useUpdateProduct,
} from '@/src/api/products';

const CreateScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  const { id: idString } = useLocalSearchParams();

  const id =
    idString !== undefined
      ? parseFloat(typeof idString === 'string' ? idString : idString[0])
      : NaN;
  const { data: updatedProduct, isLoading } = useProduct(id);
  const { mutate: createProduct, isPending } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  const router = useRouter();
  const isUpdating = !!idString;

  useEffect(() => {
    if (updatedProduct) {
      setName(updatedProduct.name);
      setPrice(updatedProduct.price.toString());
      setImage(updatedProduct.image);
    }
  }, [updateProduct]);

  const validateInput = () => {
    setErrors('');
    if (!name) {
      setErrors('Name is required');
      return false;
    }
    if (!price) {
      setErrors('Price is required');
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors('Price should be a number');
      return false;
    }

    return true;
  };

  const resetFields = () => {
    setName('');
    setPrice('');
  };

  const onUpdate = () => {
    if (!validateInput()) {
      return;
    }

    updateProduct(
      {
        id,
        name,
        price: parseFloat(price),
        image,
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      },
    );
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    createProduct(
      { name, image, price: parseFloat(price) },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      },
    );
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onDelete = () => {
    deleteProduct(id, {
      onSuccess() {
        router.push('/menu');
      },
    });
  };

  const onConfirmDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this product', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete,
      },
    ]);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: isUpdating
            ? isLoading
              ? 'Updating Product'
              : 'Update Product'
            : isPending
            ? 'Creating Product...'
            : 'Create Product',
        }}
      />

      <Image
        resizeMode="contain"
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.textButton} onPress={pickImage}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Margarita..."
        style={styles.input}
      />

      <Text style={styles.label}>Price (&euro;)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.error}>{errors}</Text>
      <Button text={isUpdating ? 'Update' : 'Create'} onPress={onSubmit} />
      {isUpdating && <Button text="Delete" transparent onPress={onConfirmDelete} />}
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

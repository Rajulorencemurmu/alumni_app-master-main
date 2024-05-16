import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
// import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios'; // Import axios for making HTTP requests
import BASE_URL from '../apiConfig';

// import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';

const PaymentPage = ({ route }) => {
    const [paymentProcessing, setPaymentProcessing] = useState(false);

  const event = route.params;
  const navigation = useNavigation();


  const formatDate=(datetime)=>{
    const date=new Date(datetime);
    const formatdate=date.toLocaleDateString();
    return `${formatdate}`
  }
  const formatTime=(datetime)=>{
    const date = new Date(datetime);
    const formattime=date.toLocaleTimeString();
    return `${formattime}`
  }


  useEffect(() => {
    navigation.setOptions({
      headerTitle: "EVENT IN DETAIL",
    });
  }, []);

  const onPress = async () => {
    console.log('pressed');
    const price1=event.price;
    console.log('after getting amt',price1)
    const price = parseFloat(event.price)
    if (price < 1) {
        Alert.alert('Error', 'The price of the event must be at least INR 1.00');
        console.log('error occured here')
        return;
      }
      const priceInPaise = Math.round(price * 100); // Convert price to paise
      console.log('price in paise',priceInPaise)

    // try {
    //     setPaymentProcessing(true);
    //     const response = await axios.post(`${BASE_URL}/api/razorpay/order`, { amount: priceInPaise });
    //     const { orderId } = response.data;

    //     const options = {
    //         description: 'Event Payment',
    //         image: 'https://example.com/your_logo.png',
    //         order_id: orderId,
    //         currency: 'INR',
    //         key: 'YOUR KEY ID',
    //         amount: priceInPaise,
    //         name: 'X Y Z',
    //         prefill: {
    //           email: 'raju.@example.com',
    //           contact: '9191919191',
    //           name: 'raju'
    //         },
    //         theme: { color: '#B03F82' },
    //       };
    //       RazorpayCheckout.open(options)
    //     .then(data => {
    //       console.log(`Success: ${data.razorpay_payment_id}`);
    //       setPaymentProcessing(false);
    //       // Handle payment success
    //     })
    //     .catch(error => {
    //     //   console.log(`Error inside try block: ${error.code} | ${error.description}`);
    //       console.log('Error inside try block',error)
    //       setPaymentProcessing(false);
    //       // Handle payment failure
    //     });
    // } catch (error) {
    //   console.error('Error creating order:', error);
    //   setPaymentProcessing(false);
    //   alert('Error', 'An error occurred while processing your payment. Please try again later.');
    // }
    
  };

  return (
    <ScrollView>
      <View>
        <Text style={{ fontSize: 24, textAlign: 'center', fontWeight: '700', marginTop: 14 }}>{event.title}</Text>
        <View style={{ marginTop: 25, marginLeft: 44, marginBottom: -27 }}>
          <Image source={require('../ProfileScreen/assets/pngegg1.png')} style={{ width: 92, height: 92 }} />
        </View>
        <View style={{ justifyContent: 'flex-end', alignSelf: 'flex-end', marginRight: 5 }}>
          <Text style={{ fontSize: 16, marginTop: -38 }}>Date: {formatDate(event.date)}</Text>
          <Text style={{ fontSize: 16 }}>Time: {formatTime(event.time)}</Text>
          <Text style={{ fontSize: 16 }}>Location: {event.location}</Text>
          <Text style={{ fontSize: 16, marginTop: 18 }}>Price: {event.price}</Text>
        </View>
        <View style={{ marginTop: 44 }}>
          <Text style={{ fontSize: 21, marginLeft: 15, fontWeight: '500' }}>Description:-</Text>
          <Text style={{ fontSize: 16, marginLeft: 18, marginRight: 7, paddingBottom: 55 }}>{event.description}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress} disabled={paymentProcessing}>
        <Text style={styles.buttonText}>{paymentProcessing ? 'Processing...' : 'Pay'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PaymentPage;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    width: 105,
    height: 40,
    alignSelf: 'center',
    borderRadius: 35,
    marginBottom: 105,
    marginVertical: 20,
    position: 'relative',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

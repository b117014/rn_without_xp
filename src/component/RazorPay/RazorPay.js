import React , {Component} from 'react';
import {View,Button,Text,StyleSheet,TouchableOpacity} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';

class  RazorPay extends Component{
    constructor(props){
        super(props);

    }

    getOption = ()=>{
        let  options = {
            description: 'Credits towards consultation',
          image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          key: 'rzp_live_q4zOfwT3zf2mWj',
          amount: '500',
          external: {
            wallets: ['paytm']
          },
          name: 'foo',
          prefill: {
            email: 'prabhatku304@gmail.com',
            contact: '8955806560',
            name: 'Prabhat'
          },
          theme: {color: '#F37254'}
        } 

        RazorpayCheckout.open(options)
             .then(data=>{alert(`success: ${data}`)
              console.log(data);
              axios.post("http://e1766314.ngrok.io/api/razorpay",{customer_id:data.razorpay_payment_id})
                   .then(res=>console.log(res.data))
                   .catch(err=>console.log(err));
              })
              .catch(err=>{
                 console.log(err.description)  
                alert(err)})
        
        RazorpayCheckout.onExternalWalletSelection(data=>{
            alert(`external : ${data.external_wallet}`)
        })
        

            }

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.getOption}>
                  <Text style={styles.text}>Pay</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles =  StyleSheet.create({
            container:{
                flex:1,
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"#F5FCFF"
            },
            text:{
                fontSize:20,
                fontWeight:"bold"
            }
})

export {RazorPay};
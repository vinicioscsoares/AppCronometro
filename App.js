import React, { useState } from "react";
import { View,Text,StyleSheet, Image, TouchableOpacity} from "react-native";

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App(){
  
  const [numero,setNumero]= useState(0);
  const [botao,setBotao] = useState('Vai!');

  const [ultimo,setUltimo] = useState(null);

  function vai(){
    if(timer !==null){
      clearInterval(timer);
      timer = null;
      setBotao('VAI');
    } else{

      timer = setInterval(()=>{
        ss++;

        if(ss == 60){
          ss = 0;
          mm++;
        }

        if(mm==60){
          mm = 0;
          hh++;
        }

        let format = (hh < 10 ? '0' + hh : hh) + ':'
        +(mm< 10 ? '0' + mm:mm ) + ':'
        +(ss <10 ? '0' + ss:ss );

        setNumero(format);


      }, 1000);

      setBotao('PARAR')
  

    }
  }

  function limpar(){
    if(timer !== null){

      clearInterval(timer);
      timer=null;
    }

    setNumero(0);
    ss=0;
    mm=0;
    hh=0;

    setBotao('VAI!')
    setUltimo(numero)
  }

  return(
    <View style={styles.container}>
      <Image source={require('./src/crono.png')} />

      <Text style={styles.timer}> {numero}</Text>

      <View style={styles.btnArea}>

        <TouchableOpacity style={styles.btn} onPress={vai}>

          <Text style={styles.btnTexto}>{botao}</Text>
        
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={limpar}>
          
          <Text style={styles.btnTexto}>Terminar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaUltimo}>
        <Text style={[styles.textoCorrida, {color:'#020202df'}]}> { ultimo ? 'Ultimo Tempo: ' + ultimo : '' } </Text>
      </View>
  
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6dc9ebc1'
  },
  timer: {
    fontSize: 35,
    marginTop: -160,
    fontWeight: 'bold',
    color: '#ffff'
  },
  btnArea:{
    flexDirection: 'row',
    marginTop: 130,
    height:40,
  },

  btn:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    height:40,
    margin:17,
    borderRadius:9,
  },

  btnTexto:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },

  areaUltimo:{
    marginTop:50,
    fontWeight: 'bold'
  },

  textoCorrida:{
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
  }
})

import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, Alert } from 'react-native'
import { Card } from 'react-native-paper'
import { FAB } from 'react-native-paper';

const Home = ({ navigation }) => {

    // const data = [
    //     {
    //         _id: "1",
    //         name: 'ramya',
    //         position: 'web developer',
    //         email: "raghu@abc.com",
    //         salary: "5 lpa",
    //         phone: 123,
    //         picture: "http://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    //     },
    //     {
    //         _id: "2",
    //         name: 'rakshitha',
    //         position: 'head eater',
    //         email: "usha@abc.com",
    //         salary: "5 lpa",
    //         phone: 123,
    //         picture: "http://images.unsplash.com/photo-1567336273898-ebbf9eb3c3bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=486&q=80"
    //     }, {
    //         _id: "3",
    //         name: 'hasani',
    //         position: 'Doctor',
    //         email: "manju@abc.com",
    //         salary: "5 lpa",
    //         phone: 123,
    //         picture: "http://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    //     }
    // ]


    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = () => {
        fetch("http://1fdd10643eda.ngrok.io/",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res=>res.json())
        .then(results => {
            setData(results)
            setLoading(false)
        }).catch(e=>{
            Alert.alert("Something went wrong")
        })
    }
    // runs only once
    useEffect(() => {
       fetchData()            
      
    }, [])

    const renderList = ((item) => {
        return (
            <Card style={styles.myCard} key={item._id} onPress={() => navigation.navigate("Profile", { item })} >
                <View style={styles.cardView}>
                    <Image style={{ width: 60, height: 60, borderRadius: 30 }}
                        source={{ uri: item.picture }}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.position}</Text>
                    </View>
                </View>
            </Card>
        )
    })

    return (
        <View style={{ flex: 1 }}>
   
                <FlatList
                    data={data}
                    onRefresh={()=>fetchData()}
                    refreshing={loading}
                    renderItem={({ item }) => {
                        console.log("flat list data", item)
                        return renderList(item)
                    }}
                    keyExtractor={item => `${item._id}`}
                />

            <FAB
                style={styles.fab}
                small={false}
                theme={{ colors: { accent: "#006aff" } }}
                icon="plus"
                onPress={() => {
                    navigation.navigate('create')
                }}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    myCard: {
        margin: 5,
    },
    cardView: {
        padding: 5,
        flexDirection: "row",
    },
    text: {
        fontSize: 20
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})

export default Home
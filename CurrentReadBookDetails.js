import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    BackHandler,
    Image,
    TouchableHighlight,
} from "react-native";

import firebase from "firebase";

export default function LibraryBookDetails(props) {
    const [timerOn, setTimerOn] = useState(false);

    useEffect(() => {
        const backAction = () => {
            props.history.push("/Home"); //wracamy do glownej
            return true; //musimy zreturnowac true -> patrz dokumentacja
        };

        const backHandler = BackHandler.addEventListener(
            //obsluga hardwarowego back buttona (tylko android)
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // przy odmontowywaniu trzeba posprzątac
    }, []);

    const handleReadNow = () => {
        setTimerOn(true);
        console.log(props.location.state.data.id);
        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid + "/library")
            .update({
                lastRead: props.location.state.data.id,
            })
            .then(() => {
                console.log("Data updated.")
            })
            .catch((error) => {
                console.error(error);
            });

    };

    return (
        <View style={{ marginTop: 50 }}>
            <View style={styles.bookContainer}>
                <Image
                    source={{ uri: props.location.state.data.thumbnail }}
                    style={{ width: 100, height: 150 }}
                />
                <View style={{ flex: 1 }}>
                    <Text>{props.location.state.data.title} </Text>
                    <TouchableHighlight
                        style={styles.readBtn}
                        onPress={() => handleReadNow()}
                    >
                        <Text style={styles.readBtnText}>Czytaj teraz!</Text>
                    </TouchableHighlight>


                </View>
            </View>

            {timerOn && (<Timer />)}

        </View>
    );
}

const Timer = () => {

    const [time, setTime] = React.useState(0);
    const [timerOn, setTimerOn] = useState(true);

    useEffect(() => {
        let interval = null;

        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!timerOn) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn]);

    const showTime = () => {
        return Math.floor((time / 3600)) + ":" + Math.floor((time / 60) % 60) + ":" + time % 60;
    }


    return (
        <>
            <Text>{showTime()}</Text>
            <TouchableHighlight onPress={() => setTime(0)}><Text>WYCZYSC</Text></TouchableHighlight>
            <TouchableHighlight onPress={() => setTimerOn(false)}><Text>STOP</Text></TouchableHighlight>
            <TouchableHighlight onPress={() => setTimerOn(true)}><Text>WZNOW</Text></TouchableHighlight>
            <TouchableHighlight ><Text>ZAKOŃCZ</Text></TouchableHighlight>
        </>
    );
}



const styles = StyleSheet.create({
    bookContainer: {
        display: "flex",
        flexDirection: "row",
    },
    readBtn: {
        position: "absolute",
        bottom: 0,
        right: "15%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 75,
        height: 34,
        backgroundColor: "dodgerblue",
    },
    readBtnText: {
        color: "#fff",
    },
});

//comments

// trzeba w onpressach dawać {() => function} zamiast {function} inaczej odpala od razu

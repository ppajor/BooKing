import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    BackHandler,
    Image,
    TouchableHighlight,
    Modal,
    TextInput,
    Alert,
    Button,
} from "react-native";
import global from "./styles.js";
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
                <TouchableHighlight style={styles.readPercentage}
                >
                    <View>
                        <Text style={styles.readPercentageText}>{props.location.state.bookPercent}%</Text>
                    </View>
                </TouchableHighlight>
                <View style={{ flex: 1 }}>
                    <Text>{props.location.state.data.title} </Text>
                    <TouchableHighlight
                        style={global.primaryBtn}
                        onPress={() => handleReadNow()}
                    >
                        <Text style={styles.readBtnText}>Czytaj teraz!</Text>
                    </TouchableHighlight>


                </View>
            </View>

            {timerOn && (<Timer bookID={props.location.state.data.id} />)}

        </View>
    );
}

const Timer = (props) => {

    const [time, setTime] = React.useState(0);
    const [timerOn, setTimerOn] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [pageNumber, setPageNumber] = useState("1");

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

    const endReading = () => {
        setTimerOn(false);
        setModalVisible(true);
    }

    const savePageNumber = (num) => {
        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid + "/library/readNow/" + props.bookID)
            .update({
                lastReadPageNumber: parseInt(num),
            })
            .then(() => {
                console.log("Data updated.")
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <Text>{showTime()}</Text>
            <TouchableHighlight onPress={() => setTime(0)}><Text>WYCZYSC</Text></TouchableHighlight>
            <TouchableHighlight onPress={() => setTimerOn(false)}><Text>STOP</Text></TouchableHighlight>
            <TouchableHighlight onPress={() => setTimerOn(true)}><Text>WZNOW</Text></TouchableHighlight>
            <TouchableHighlight onPress={() => endReading()} ><Text>ZAKOŃCZ</Text></TouchableHighlight>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Na jakiej stronie skończyłeś czytać?</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPageNumber}
                        value={pageNumber}
                    />
                    <TouchableHighlight onPress={() => savePageNumber(pageNumber)}><Text>Zatwierdź</Text></TouchableHighlight>
                </View>
            </Modal>
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
    modalContainer: {
        width: 150,
        height: 120,
        marginTop: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    modalText: {
        color: "#a8a8a8",
    },
    readPercentage: {
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        backgroundColor: "#000",
        zIndex: 2,
        width: 100,
        height: 150,
        marginLeft: 0,
        marginRight: 10,
        opacity: 0.78,
    },
    readPercentageText: {
        textAlign: "center",
        fontSize: 25,
        color: "#fff",
    },
});

    //comments

// trzeba w onpressach dawać {() => function} zamiast {function} inaczej odpala od razu

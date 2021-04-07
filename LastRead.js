import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
} from "react-native";
import firebase from 'firebase';
import { Redirect } from 'react-router-native';

const LastRead = props => {

    const [loading, setLoading] = useState(true);
    const [lastReadBook, setLastReadBook] = useState({});
    const [bookPercent, setBookPercent] = useState(0);

    useEffect(() => {
        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid + "/library")
            .once("value")
            .then((snapshot) => {
                let data = snapshot.val(); // co zrobic gdy uzytkownik nie ma nic w czytanych i jest null??
                // console.log("Last read:" + data.lastRead);

                if (typeof (data.lastRead != "undefined")) {
                    firebase
                        .database()
                        .ref("/users/" + firebase.auth().currentUser.uid + "/library")
                        .once("value")
                        .then((snapshot) => {
                            let data = snapshot.val(); // co zrobic gdy uzytkownik nie ma nic w czytanych i jest null??
                            let lastread = data.lastRead;
                            let book = data.readNow[lastread];
                            let bookPercentage = Math.floor(data.readNow[lastread].lastReadPageNumber / data.readNow[lastread].pageCount * 100);
                            setBookPercent(bookPercentage);
                            setLastReadBook(book);
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.error(error);
                        });

                }

            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            {Object.keys(lastReadBook).length > 0 && <Text>Ostatnio czytana</Text>}
            {!loading && (
                <>
                    <View style={styles.container}>
                        <Image
                            style={styles.bookMockup}
                            source={{ uri: lastReadBook.thumbnail }}
                        ></Image>
                        <TouchableHighlight style={styles.readPercentage}
                        >
                            <View>
                                <Text style={styles.readPercentageText}>{bookPercent}%</Text>
                            </View>
                        </TouchableHighlight>
                        <Text>{lastReadBook.title}</Text>
                        <TouchableHighlight style={styles.readBtn}>
                            <Text style={{ color: "#fff" }}>Czytaj dalej</Text>
                        </TouchableHighlight>
                    </View>
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#f8f8f8",
    },
    bookMockup: {
        width: 90,
        height: 134,
        marginLeft: 10,
        marginRight: 10,
    },
    readPercentage: {
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        backgroundColor: "#000",
        zIndex: 2,
        width: 90,
        height: 134,
        marginLeft: 10,
        marginRight: 10,
        opacity: 0.78,
    },
    readPercentageText: {
        textAlign: "center",
        fontSize: 25,
        color: "#fff",
    },
    readBtn: {
        position: "absolute",
        bottom: 0,
        right: "15%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 95,
        height: 34,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "dodgerblue",
    },
});


export default LastRead;
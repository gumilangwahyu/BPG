import { collection, addDoc, query, orderBy, onSnapshot, where, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import React, { useEffect, useState, useLayoutEffect, Fragment } from 'react';
import { auth, db } from '../firebase';
// import { collection, query, where } from "firebase/firestore";
import {
    SafeAreaView,
    StatusBar,

    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    FlatList,
    ScrollView,
    Button,
    useColorScheme,
    View,
    Dimensions,


} from 'react-native';


const GamesScreen = ({ navigation, route }) => {
    const dimensions = Dimensions.get('window');
    const imageWidth = dimensions.width;

    const [notiUsers, setNotiUsers] = useState([])
    const [Users, setUsers] = useState([])

    useEffect(() => {
        const getUserContacts = () => {
            const q = query(doc(db, "users", route.params.user_id));
            const unsubscribe = onSnapshot(q, async (snapshot) => {
                const contactsObject = snapshot.data().realFriend;
                const contactsSnap = await Promise.all(contactsObject.map((c) => getDoc(doc(db, "users", c))))
                const contactDetails = contactsSnap.map((d) => ({
                    id: d.uid,
                    ...d.data()
                }))
                setNotiUsers(contactDetails);
            })
        }


        getUserContacts();
    }, [navigation])
    
    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#E2E2E2' }} />
            <View style={{ backgroundColor: '#E2E2E2', flex: 1, alignItems: 'center' }}>
                <Text style={{ marginVertical: 20, fontWeight: '800' }} >Play a Game</Text>

                <View style={{ marginTop: 15 }}>
                    <TouchableOpacity  >
                        <View style={styles.card} >
                            <Image style={styles.userImageST} source={require('../assets/7Scopes.png')} />
                            <View style={styles.textArea}>
                                <Text style={styles.nameText} >7Scopes</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Fragment>

    )
}

const styles = StyleSheet.create({
    Contain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Container: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    card: {
        width: '100%',
        height: 'auto',
        marginHorizontal: 4,
        marginVertical: 6,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userImage: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    userImageST: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textArea: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 5,
        paddingLeft: 10,
        width: 300,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    userText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameText: {
        fontSize: 14,
        fontWeight: '900',
        fontFamily: 'Verdana'
    },
    msgTime: {
        textAlign: 'right',
        fontSize: 11,
        marginTop: -20,
    },
    msgContent: {
        paddingTop: 5,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },

})

export default GamesScreen;

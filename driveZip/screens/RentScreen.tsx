import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const RentScreen: React.FC = () => {
    const [seconds, setSeconds] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(true);
    const [speed, setSpeed] = useState<number>(0);
    const [direction, setDirection] = useState<number>(1);

    const navigation = useNavigation();

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        if (seconds >= 5) {
            let newSpeed: number;

            if (seconds >= 5 && seconds < 8) {
                newSpeed = interpolateSpeed(seconds, 5, 8, 1, 3);
            } else if (seconds >= 8 && seconds < 11) {
                newSpeed = interpolateSpeed(seconds, 8, 11, 3, 1);
            } else if (seconds >= 11 && seconds < 15) {
                newSpeed = interpolateSpeed(seconds, 11, 15, 1, 4);
            } else if (seconds >= 15 && seconds < 20) {
                newSpeed = interpolateSpeed(seconds, 15, 20, 4, 7);
            } else if (seconds >= 20 && seconds < 25) {
                newSpeed = interpolateSpeed(seconds, 20, 25, 7, 0);
            } else {
                newSpeed = 0;
            }

            setSpeed(newSpeed);
        }
    }, [seconds]);

    const interpolateSpeed = (value: number, start1: number, stop1: number, start2: number, stop2: number): number => {
        const percentage = (value - start1) / (stop1 - start1);

        if (start2 < stop2) {
            return start2 + (stop2 - start2) * percentage;
        } else {
            return start2 - (start2 - stop2) * percentage;
        }
    };

    const formatTime = (time: number): string => {
        const minutes: number = Math.floor(time / 60);
        const seconds: number = time % 60;

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleStop = (): void => {
        Alert.alert(
            'Зупинити таймер',
            'Ви впевнені, що хочете завершити поїздку?',
            [
                { text: 'Ні', style: 'cancel' },
                {
                    text: 'Так',
                    onPress: () => {
                        setIsRunning(false);
                        navigation.navigate('Home');
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.speedometerContainer}>
                <Text style={styles.speedometerText}>{speed.toFixed(2)}</Text>
                <Text style={styles.speedUnitText}>км/год</Text>
            </View>
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            <TouchableOpacity style={styles.button} onPress={handleStop}>
                <Text style={styles.buttonText}>Завершити поїздку</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    speedometerContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 20,
    },
    speedometerText: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    speedUnitText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    timerText: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#000000',
        paddingHorizontal: 10,
        paddingVertical: 10,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 220,
        marginTop: 50,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RentScreen;
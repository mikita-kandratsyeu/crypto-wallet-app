import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MainLayoutWrapper } from '.';
import { Icon, SectionTitle, Setting } from '../components';
import { colors, dummyData, fonts, messages, sizes } from '../constants';
import { showAlert } from './services';

export const Profile: React.FC = () => {
  const [faceId, setFaceId] = useState<boolean>(false);

  const alertHandler = () =>
    showAlert({
      title: messages.titleAlert,
      body: messages.bodyAlert,
      buttons: [
        {
          text: messages.buttonAlert,
          onPress: () => null,
          style: 'cancel',
        },
      ],
    });

  return (
    <MainLayoutWrapper>
      <View style={styles.root}>
        <ScrollView>
          <View style={styles.scrollViewContainer}>
            <View style={styles.emailContainer}>
              <Text style={styles.emailText}>{dummyData.profile.email}</Text>
              <Text style={styles.idText}>{`ID: ${dummyData.profile.id}`}</Text>
            </View>
            <View style={styles.verifyContainer}>
              <Icon name="Verified" color={colors.lightGreen} />
              <Text
                style={{
                  marginLeft: sizes.base,
                  color: colors.lightGreen,
                  ...fonts.body4,
                }}
              >
                {messages.verified}
              </Text>
            </View>
          </View>
          <SectionTitle title={messages.app} />
          <Setting
            title={messages.launchScreen}
            value={messages.launchScreenValue}
            onPress={alertHandler}
            type="button"
          />
          <Setting
            title={messages.appearance}
            value={messages.appearanceValue}
            onPress={alertHandler}
            type="button"
          />
          <SectionTitle title={messages.account} />
          <Setting
            title={messages.paymentCurrency}
            value={messages.paymentCurrencyValue}
            onPress={alertHandler}
            type="button"
          />
          <Setting
            title={messages.language}
            value={messages.languageValue}
            onPress={alertHandler}
            type="button"
          />
          <SectionTitle title={messages.security} />
          <Setting
            title={messages.faceId}
            switchValue={faceId}
            onSwitchValueChange={setFaceId}
            type="switch"
          />
          <Setting
            title={messages.passwordSettings}
            type="button"
            onPress={alertHandler}
          />
          <Setting
            title={messages.changePassword}
            type="button"
            onPress={alertHandler}
          />
          <Setting
            title={messages.twoFactorAuth}
            type="button"
            onPress={alertHandler}
          />
        </ScrollView>
      </View>
    </MainLayoutWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: sizes.padding,
    backgroundColor: colors.black,
  },
  scrollViewContainer: {
    flexDirection: 'row',
    marginTop: sizes.radius,
  },
  emailContainer: {
    flex: 1,
  },
  emailText: {
    color: colors.white,
    ...fonts.h3,
  },
  idText: {
    color: colors.lightGray,
    ...fonts.body4,
  },
  verifyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

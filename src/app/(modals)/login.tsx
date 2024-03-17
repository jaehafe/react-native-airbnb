import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useWarmUpBrowser } from '@/src/hooks/useWarmUpBrowser';
import { defaultStyles } from '@/src/constants/Styles';
import Colors from '@/src/constants/Colors';
import { Apple, AppleIcon, Mail, Phone } from 'lucide-react-native';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function LoginModal() {
  useWarmUpBrowser();
  const router = useRouter();

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
  const { startOAuthFlow: githubAuth } = useOAuth({ strategy: 'oauth_github' });

  enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Github = 'oauth_github',
  }

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Github]: githubAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (error) {
      console.error('Oauth error', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput autoCapitalize="none" placeholder="Email" style={[defaultStyles.inputField, { marginBottom: 30 }]} />

      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.separatorView}>
        <View style={{ flex: 1, borderBottomColor: '#000', borderBottomWidth: StyleSheet.hairlineWidth }} />
        <Text style={styles.separator}>or</Text>
        <View style={{ flex: 1, borderBottomColor: '#000', borderBottomWidth: StyleSheet.hairlineWidth }} />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity style={styles.btnOutline}>
          <Phone color={'black'} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>
        {/*  */}
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
          <Apple color={'black'} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>
        {/*  */}
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
          <Phone color={'black'} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        {/*  */}
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Github)}>
          <Phone color={'black'} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Github</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },
  separatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  separator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});

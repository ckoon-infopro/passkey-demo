import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  startRegistration,
  startAuthentication,
} from '@simplewebauthn/browser';
import {
  RegistrationResponseJSON,
  AuthenticationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/types';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebAuthnService {
  private baseUrl = 'YOUR_BACKEND_API_URL'; // !!! IMPORTANT: Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  async registerPasskey(username: string): Promise<any> {
    try {
      // 1. Get registration options from your backend (MOCKED FOR POC)
      const options: PublicKeyCredentialCreationOptionsJSON = {
        challenge: btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32)))),
        rp: {
          name: 'Gemini Passkey Demo',
          id: window.location.hostname,
        },
        user: {
          id: btoa(username),
          name: username,
          displayName: username,
        },
        pubKeyCredParams: [
          { type: 'public-key', alg: -7 }, // ES256
          { type: 'public-key', alg: -257 }, // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          requireResidentKey: true,
          userVerification: 'preferred',
        },
        timeout: 60000,
        attestation: 'direct',
      };
      console.log('Mock Registration Options:', options);

      // 2. Start WebAuthn registration in the browser
      const attResp: RegistrationResponseJSON = await startRegistration({ optionsJSON: options });

      // 3. Send registration response to your backend for verification (MOCKED FOR POC)
      console.log('Mock Registration Response (would be sent to backend):', attResp);
      const verificationResult = { verified: true };
      // End of mocked verification

      if (verificationResult.verified) {
        console.log('Passkey registered successfully! (mocked)');
        return verificationResult;
      } else {
        console.error('Passkey registration failed (mocked):', verificationResult);
        throw new Error('Passkey registration failed (mocked)');
      }
    } catch (error) {
      console.error('Error during passkey registration:', error);
      throw error;
    }
  }

  async authenticatePasskey(): Promise<any> {
    try {
      // 1. Get authentication options from your backend (MOCKED FOR POC)
      const options: PublicKeyCredentialRequestOptionsJSON = {
        challenge: btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32)))),
        rpId: window.location.hostname,
        userVerification: 'preferred',
        timeout: 60000,
      };
      console.log('Mock Authentication Options:', options);

      // 2. Start WebAuthn authentication in the browser
      const authResp: AuthenticationResponseJSON = await startAuthentication({ optionsJSON: options });

      // 3. Send authentication response to your backend for verification (MOCKED FOR POC)
      console.log('Mock Authentication Response (would be sent to backend):', authResp);
      // In a real app, the backend would look up the user by authResp.rawId
      // and then verify the signature. For the POC, we'll decode the userHandle.
      const username = atob(authResp.response.userHandle!);
      const verificationResult = { verified: true, username };
      // End of mocked verification

      if (verificationResult.verified) {
        console.log(`Passkey authenticated successfully for ${username}! (mocked)`);
        return verificationResult;
      } else {
        console.error('Passkey authentication failed (mocked):', verificationResult);
        throw new Error('Passkey authentication failed (mocked)');
      }
    } catch (error) {
      console.error('Error during passkey authentication:', error);
      throw error;
    }
  }
}

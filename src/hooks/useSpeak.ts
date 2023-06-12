import { message } from "antd";
import { useEffect, useRef } from "react";
import useRefFn from "./useRefFn";
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";
import Cookie from "js-cookie";
import axios from "axios";
import { getSpeechTokenService } from "@/services/speech";

type Callback = (data: Blob) => void;

export default function useSpeak() {
  const audioDataRef = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder>();

  async function getTokenOrRefresh() {
    const speechToken = Cookie.get("speech-token");
    console.log(window.document.cookie);
    if (speechToken === undefined) {
      try {
        const res = await getSpeechTokenService();
        const token = res.data.token;
        const region = res.data.region;
        Cookie.set("speech-token", region + ":" + token, {
          ["max-age"]: "540",
          path: "/",
        });
        console.log("Token fetched from back-end: " + token);
        return { authToken: token, region: region };
      } catch (err: any) {
        return { authToken: null, error: err.message };
      }
    } else {
      console.log("Token fetched from cookie: " + speechToken);
      const idx = speechToken.indexOf(":");
      return {
        authToken: speechToken.slice(idx + 1),
        region: speechToken.slice(0, idx),
      };
    }
  }

  const recognizerRef = useRef<speechsdk.SpeechRecognizer>();
  async function initRecongnizer() {
    const tokenObj = await getTokenOrRefresh()!;
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken!,
      tokenObj.region!
    );
    speechConfig.speechRecognitionLanguage = "zh-CN";

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(
      speechConfig,
      audioConfig
    );
    recognizer.recognizing = (sender, event) => {
      console.log(event);
    };
    recognizerRef.current = recognizer;
  }

  useEffect(() => {
    initRecongnizer();
  }, []);

  function start() {
    const inst = recognizerRef.current;
    if (!inst) return;
    inst.startContinuousRecognitionAsync();
  }

  function stop() {
    const inst = recognizerRef.current;
    if (!inst) return;
    inst.stopContinuousRecognitionAsync();
  }

  return { start, stop };
}

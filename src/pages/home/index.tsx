import { Dropdown, Input, Layout, message } from "antd";
import { useEffect, useState } from "react";
import Mousetrap from "mousetrap";
import useSpeak from "@/hooks/useSpeak";

const enum InputMode {
  F2,
  Always,
}
const InputModeText = {
  [InputMode.F2]: "按住F2说话",
  [InputMode.Always]: "自由说话",
};

export default function Home() {
  const [inputMode, setInputMode] = useState(InputMode.F2);
  const { start, stop } = useSpeak();

  useEffect(() => {
    if (inputMode === InputMode.F2) {
      let isSpeaking = false;
      Mousetrap.bind(
        "f2",
        () => {
          if (!isSpeaking) {
            start();
            isSpeaking = true;
          }
        },
        "keydown"
      );
      Mousetrap.bind(
        "f2",
        () => {
          stop();
          isSpeaking = false;
        },
        "keyup"
      );
      return () => {
        Mousetrap.unbind("f2", "keydown");
        Mousetrap.unbind("f2", "keyup");
      };
    }
  }, [inputMode]);

  async function handleSay() {
    console.log(navigator.mediaDevices.getUserMedia);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
  }

  return (
    <Layout>
      <Layout.Header className="text-white text-center">
        AI语音p图
      </Layout.Header>
      <Layout.Footer>
        <Dropdown.Button
          type="primary"
          menu={{
            items: [
              { label: "按住F2说话", key: InputMode.F2 },
              { label: "自由说话", key: InputMode.Always },
            ],
            onClick({ key }) {
              setInputMode(key as unknown as InputMode);
            },
          }}
        >
          {InputModeText[inputMode]}
        </Dropdown.Button>
      </Layout.Footer>
    </Layout>
  );
}

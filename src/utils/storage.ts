import {
  exists,
  BaseDirectory,
  writeTextFile,
  readTextFile,
} from "@tauri-apps/api/fs";

const filename = "storage.json";

async function setLocalStorage(key: string, value: any) {
  const str = JSON.stringify(value);
  const originObj = JSON.parse(
    (await readTextFile(filename, {
      dir: BaseDirectory.AppLocalData,
    })) || JSON.stringify({})
  );
  originObj[key] = str;
  await writeTextFile(filename, JSON.stringify(originObj), {
    dir: BaseDirectory.AppLocalData,
  });
}

async function getLocalStorage(key: string) {
  const isExists = await exists(filename, { dir: BaseDirectory.AppLocalData });
  if (!isExists) {
    return null;
  }
  const originObj = JSON.parse(
    (await readTextFile(filename, {
      dir: BaseDirectory.AppLocalData,
    })) || JSON.stringify({})
  );
  if (key in originObj) {
    return JSON.parse(originObj[key]);
  }
  return null;
}

export const storage = {
  get: getLocalStorage,
  set: setLocalStorage,
};

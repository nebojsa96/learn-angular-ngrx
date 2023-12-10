export const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',');
    const matchRes = arr[0].match(/:(.*?);/);
    const mime = matchRes ? matchRes[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while(n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime});
}

export const blobToBase64 = (blob: Blob): Promise<string | ArrayBuffer | null> => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };
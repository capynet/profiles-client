export default function useFileTools() {

    const toBase64 = (file): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        })
    };


    const dataUrlToFile = async (dataUrl: string, fileName: string) => {
        const res: Response = await fetch(dataUrl);
        const blob: Blob = await res.blob();
        return new File([blob], fileName, {type: 'image/jpg'});
    }


    return {toBase64, dataUrlToFile}
}


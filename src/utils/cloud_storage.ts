import { Storage } from "@google-cloud/storage";
import { format } from "util";
import { parse } from "node:url";
import { v4 as uuidv4 } from "uuid";


//Configuracion del bucket
const gcsStorage = new Storage({
    projectId:'delivery-app-practica',
    keyFilename: '../../serviceAccountKey.json'
})

const bucket = gcsStorage.bucket('gs://delivery-app-practica.appspot.com/')

/**
 * @param {object} file - File Object
 * @param {string} pathImage - Path where image well be stored
 * @param {string|null} deletePathImage - Public URL of the image to delete
 * @returns {Promise<string>}- Public URL of uploaded image
 */

 export const uploadImageToFirebase= async(
    file: Express.Multer.File,
    pathImage:string,
    deletePathImage?:string|null
)=>{
    try {
        const uuid = uuidv4()
        if(deletePathImage){
            const parsedPath = parse(deletePathImage)
            const imagePath = parsedPath.pathname?.slice(23)
            if (imagePath) {
                const fileToDelete = bucket.file(imagePath)
                try {
                    await fileToDelete.delete()
                    console.log('Previus image deleted succesfully');
                    
                } catch (error:any) {
                    console.warn('Error deleting image', error.message)
                }    
            }
            
        }
        if(!pathImage) throw new Error('Path image is required');
        const fileUpload = bucket.file(pathImage)
        const blobStream = fileUpload.createWriteStream({
            metadata:{
                contentType:'image/png',
                metadata:{
                    firebaseStorageDownloadTokens: uuid,
                }
            },
            resumable:false
        })
        return new Promise((resolve,reject)=>{
            blobStream.on('Error',(error)=>{
                console.log('Error uploading file to Firebase', error);
                reject('Error uploading the file')
                
            });
            blobStream.on('finish',()=>{
                const publicUrl = format(
                    `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileUpload.name)}?alt=media&token=${uuid}`
                );
                console.log('Generated URL', publicUrl);
                resolve(publicUrl)
                
            });
            blobStream.end(file.buffer)
        })
    } catch (error) {
        console.log('General error in uploadImageToFirebase', error);
        
    }

}


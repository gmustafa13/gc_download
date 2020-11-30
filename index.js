const express = require("express");
const app = express();
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');

let gulam = async () => {
    const bucketName = "port-event-photos";
    const srcFilename = "Port-1606287160123.png";
    const destFilename = "./downloaded.png";
    // const storage = new Storage({
    //     projectId: 'port-236409',
    //     keyFilename: gcFile,
    // });
    const storage = new Storage();
    async function downloadFile() {
        const options = {
            // The path to which the file should be downloaded, e.g. "./file.txt"
            destination: destFilename,
        };

        // Downloads the file
        // console.log(
        //   `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
        // );
        return await storage.bucket(bucketName).file(srcFilename).download(options);

    }
    return await downloadFile()

}

app.get("/abc", async (req, res) => {
    let result = await gulam();
    // if (result.catch((e) => { res.send(e) }))
    // let data =[]
     
      await fs.readFile('./downloaded.png', async (err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.send(data)
                // data.push(result)
            }
        })

    // console.log("ffffffffff",abc)
    // res.send(data)
    // let a = fs.readFileSync('./downloaded.png').toString()
    // res.send(a)
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})


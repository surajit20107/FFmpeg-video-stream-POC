import express from "express";
import cors from "cors";
import fs from "fs";
import { upload } from "./multer.js";
import { v4 as uuid } from "uuid";
import { exec } from "child_process"; // don't use in production or even if you use you must know what you are doing

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: "*",
  }),
);
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.get("/", function (_, res) {
  res.status(200).json({
    message: "Hello World",
  });
});

app.post("/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  if (!file) {
    res.status(400).json({
      message: "No file uploaded",
    });
  }
  console.log("file uploaded");
  const lessonId = uuid();
  const videoPath = file.path;
  const outputPath = `./uploads/${lessonId}`;
  const hlsPath = `${outputPath}/index.m3u8`;

  console.log("hlsPath", hlsPath);

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  // ffmpeg command (the secret sauce)
  // const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;

  const ffmpegCommand = `ffmpeg -y -loglevel error -i "${videoPath}" \
-c:v libx264 -c:a aac \
-vf scale=640:360 \
-hls_time 10 \
-hls_playlist_type vod \
-hls_segment_filename "${outputPath}/segment%03d.ts" \
-start_number 0 \
-f hls "${hlsPath}"`;

  // no queue because of POC, not to be used in production
  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.log(`execution error: ${error?.message}`);
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    // const videoUrl = `http://localhost:3000/uploads/${lessonId}/index.m3u8`;
    const videoUrl = `https://c8b42fd5-fcba-484a-8a86-42ab247fcc30-00-2fc4x24q6z1os.sisko.replit.dev/uploads/${lessonId}/index.m3u8`;

    res.status(200).json({
      message: "Video converted to HLS format",
      videoUrl: videoUrl,
      lessonId: lessonId,
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

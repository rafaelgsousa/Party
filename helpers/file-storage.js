import multer from "multer";
import path from "path";

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img', path.join(process.cwd(), "uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: diskStorage });

export { diskStorage, upload };

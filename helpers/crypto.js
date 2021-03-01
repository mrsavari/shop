const crypto = require('crypto'),
    argv = require("yargs").argv,
    resizedIV = Buffer.allocUnsafe(16),
    iv = crypto
      .createHash("sha256")
      .update("myHashedIV")
      .digest();

iv.copy(resizedIV);
if (argv.e && argv.key) {
    const key = crypto
        .createHash("sha256")
        .update(argv.key)
        .digest(),
        cipher = crypto.createCipheriv("aes256", key, resizedIV),
        msg = [];

    argv._.forEach( function (phrase) {
        msg.push(cipher.update(phrase, "binary", "hex"));
    });
    msg.push(cipher.final("hex"));
    console.log(msg.join(""));

} else if (argv.d && argv.key) {
    const key = crypto
        .createHash("sha256")
        .update(argv.key)
        .digest(),
        decipher = crypto.createDecipheriv("aes256", key, resizedIV),
        msg = [];

    argv._.forEach( function (phrase) {
        msg.push(decipher.update(phrase, "hex", "binary"));
    });

    msg.push(decipher.final("binary"));
    console.log(msg.join(""));
}
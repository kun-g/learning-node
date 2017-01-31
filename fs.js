var fs = require('fs');

console.log(process.cwd());

// fs.watch - 监控文件变化
var watcher = fs.watch('./', {recursive: true});

watcher.on('change', (eventType, filename) => {
  if (filename)
    console.log(filename, eventType);

    if (filename == 'close') {
        watcher.close();
    }
    // Prints: <Buffer ...>
});

// fs.stat / lstat / fstat - 一般用于确认文件存在后进行属性检测
// atime "Access Time" - Time when file data last accessed. Changed by the mknod(2), utimes(2), and read(2) system calls.
// mtime "Modified Time" - Time when file data last modified. Changed by the mknod(2), utimes(2), and write(2) system calls.
// ctime "Change Time" - Time when file status was last changed (inode data modification). Changed by the chmod(2), chown(2), link(2), mknod(2), rename(2), unlink(2), utimes(2), read(2), and write(2) system calls.
// birthtime "Birth Time" - Time of file creation. Set once when the file is created. 
var stats = fs.statSync('.git');
console.log(`
stats.isFile() ${stats.isFile()}
stats.isDirectory() ${stats.isDirectory()}
stats.isBlockDevice() ${stats.isBlockDevice()}
stats.isCharacterDevice() ${stats.isCharacterDevice()}
stats.isSymbolicLink() (only valid with fs.lstat()) ${stats.isSymbolicLink()}
stats.isFIFO() ${stats.isFIFO()}
stats.isSocket() ${stats.isSocket()}
${require('util').inspect(stats)}
`)

// fs.access - 不打开文件的情况下检查属性
fs.access('index.html', fs.constants.F_OK | fs.constants.X_OK | fs.constants.R_OK | fs.constants.W_OK, console.log);

// fs.appendFile / appendFileSync- 在文件末尾追加信息
fs.appendFileSync('message.txt', 'data to append');

// fs.chmod(path, mode, callback) / fchmod(fd, mode, callback)
// fs.chown(path, uid, gid, callback) / fchown(fd, uid, gid, callback)
// fs.close(fd, callback)

// fs.createReadStream
// fs.createReadStream('sample.txt', {start: 90, end: 99});
/*
{
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 0o666,
  autoClose: true
}
*/

// fs.createWriteStream
// fs.createWriteStream(path[, options])
/*
{
  flags: 'w',
  defaultEncoding: 'utf8',
  fd: null,
  mode: 0o666,
  autoClose: true
}
*/

// fs.fdatasync(fd, callback)
// fs.fdatasync(fd, callback)

// fs.ftruncate(fd, len, callback)
console.log('Before trancate ', fs.readFileSync('message.txt', 'utf8'));
const fd = fs.openSync('message.txt', 'r+');
fs.ftruncateSync(fd, 4);
console.log('After trancate', fs.readFileSync('message.txt', 'utf8'));

// fs.futimes(fd, atime, mtime, callback) -- 改变由所提供的文件描述符所指向的文件的文件时间戳。

// fs.link(existingPath, newPath, callback)

// fs.mkdir(path[, mode], callback)

// fs.mkdtemp('/tmp/foo-', (err, folder) => {
//   if (err) throw err;
//   console.log('temp folder', folder);
// });
// fs.mkdtemp('temp' + require('path').sep, (err, folder) => {
//   if (err) throw err;
//   console.log(folder);
// });

// fs.open(path, flags[, mode], callback)
//flags 可以是：
// 'r' - 以读取模式打开文件。如果文件不存在则发生异常。
// 'r+' - 以读写模式打开文件。如果文件不存在则发生异常。
// 'rs+' - 以同步读写模式打开文件。命令操作系统绕过本地文件系统缓存。
// 这对 NFS 挂载模式下打开文件很有用，因为它可以让你跳过潜在的旧本地缓存。 它对 I/O 的性能有明显的影响，所以除非需要，否则不要使用此标志。
// 注意，这不会使 fs.open() 进入同步阻塞调用。 如果那是你想要的，则应该使用 fs.openSync()。
// 'w' - 以写入模式打开文件。文件会被创建（如果文件不存在）或截断（如果文件存在）。
// 'wx' - 类似 'w'，但如果 path 存在，则失败。
// 'w+' - 以读写模式打开文件。文件会被创建（如果文件不存在）或截断（如果文件存在）。
// 'wx+' - 类似 'w+'，但如果 path 存在，则失败。
// 'a' - 以追加模式打开文件。如果文件不存在，则会被创建。
// 'ax' - 类似于 'a'，但如果 path 存在，则失败。
// 'a+' - 以读取和追加模式打开文件。如果文件不存在，则会被创建。
// 'ax+' - 类似于 'a+'，但如果 path 存在，则失败。

// fs.read(fd, buffer, offset, length, position, callback) / fs.readSync(fd, buffer, offset, length, position)

// fs.readdir(path[, options], callback)
console.log('Current directory\n', fs.readdirSync('./'))

// fs.readFile(file[, options], callback) / fs.readFileSync(file[, options])

// fs.readlink(path[, options], callback) / fs.readlinkSync(path[, options])

// fs.realpath(path[, options], callback)
console.log('Realpath:', fs.realpathSync('./'));

// fs.rename(oldPath, newPath, callback) / fs.renameSync(oldPath, newPath)

// fs.rmdir(path, callback) / fs.rmdirSync(path)

// fs.symlink(target, path[, type], callback) / fs.symlinkSync(target, path[, type])

// fs.unlink(path, callback) / fs.unlinkSync(path)

// fs.utimes(path, atime, mtime, callback) / fs.utimesSync(path, atime, mtime)

// fs.write(fd, buffer, offset, length[, position], callback) / fs.writeSync(fd, buffer, offset, length[, position]) - Write buffer to the file specified by fd.
// fs.write(fd, data[, position[, encoding]], callback) / fs.writeSync(fd, data[, position[, encoding]]) - Write data to the file specified by fd. If data is not a Buffer instance then the value will be coerced to a string.
// fs.writeFile(file, data[, options], callback) / fs.writeFileSync(file, data[, options]) - Asynchronously writes data to a file, replacing the file if it already exists. data can be a string or a buffer.
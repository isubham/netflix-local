import fs from 'fs';
import path from 'path';

class FileIterator {

	
	static shouldInclude(file) {

		const filterconfig = {
			startsWith: ['.'], 
			endWith: {
				fonts: ['ttf', '.TTF', '.otf', '.OTF', ],
				images: ['.ico', '.jpg', '.JPG', 'jpeg', '.JPEG', '.png', '.PNG',],
				subtitle: ['.srt', '.SRT', ],
				torrents: ['.torrent',],
				others: ['.cue',  '.ass', '.url', ],
				compressedFile: ['.gz', ]
			},
			
		};

		const endWithAll = [
				...filterconfig.endWith.fonts, 
				...filterconfig.endWith.images, 
				...filterconfig.endWith.subtitle, 
				...filterconfig.endWith.torrents, 
				...filterconfig.endWith.others, 
				...filterconfig.endWith.compressedFile]

		const startWithMatches = filterconfig.startsWith.filter(startWith => file[0] == startWith)
		if (startWithMatches.length != 0) {
			return false;
		}

		const fileExtension = path.extname(file);
		const notFoundIndex = -1;
		const isNotBlackListFile = endWithAll.indexOf(fileExtension) > notFoundIndex;
		return isNotBlackListFile;

	}

	static getFilesOfFolder(workingDir) {
		const files =  fs.readdirSync(workingDir);
		return files;
	}

	/**
	 * 
	 * @param {*} workingDir 
	 * @returns array of absolute files locations 
	 * [
	 * "a", 
	 * "b/c.txt", 
	 * "d/e/f/g.pdf"
	 * ]
	 */
	static getFolderHierarchy(workingDir, allFiles=[]) {
		const files =  fs.readdirSync(workingDir);

		if (files.length == 0) {
			return allFiles;
		}

		files.forEach(file => 
		{
			const isBlackListFile = FileIterator.shouldInclude(file);
			if (isBlackListFile) {
				console.log(`isBlackListFile`, file)
				return;
			}

			const filename = path.join(workingDir, file);
			const isFolder = fs.statSync(filename).isDirectory();
			if (!isFolder) {
				allFiles.push(filename);
			}
			else {
				FileIterator.getFolderHierarchy(filename, allFiles);
			}


		});

		return allFiles;
	}

};

export { FileIterator };

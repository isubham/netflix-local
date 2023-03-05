import fs from 'fs';

/* 
 * this will fetch details for the frontend
 * library hierarchy 
 * / 
 * - title 1
 *   - s1
 *   	- ep1
 *   	- ep2
 *   - s2
 * - title2
 *
 * should return
 * [
 *  title1/s1/ep1
 *  title1/s1/ep2
 *  title1/s2/ep1
 *  title1/s2/ep2
 *  title2
 * ]
 * */
function getFolderHierarchy(workingDir, allFiles) {
	// console.log(`0 ${workingDir} `);
	// get all the content
	//
	const files =  fs.readdirSync(workingDir);
	if (files.length == 0) {
		// if there are no files append in hierarchy object and return
		return allFiles;
	}
	else {

		// console.log("1. iterating files", files);
		files.forEach(file => 
		{
			if (file[0] != ".") {
				const filename = workingDir + "/" + file;
				const isDir = fs.statSync(filename).isDirectory();
				// console.log("2. is Directory",  " ",  filename," ", isDir);
				if (isDir) {
					// console.log("\n3. crawling inside", filename);
					getFolderHierarchy(filename, allFiles);
				}
				else {

					allFiles.push(filename);
				}

			}
		}
		);
		return allFiles;
	}

}

export { getFolderHierarchy };

// const files = getFolderHierarchy("Anime", [])
// console.log("4. result");
// console.log(files);

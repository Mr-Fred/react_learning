import fs from 'fs'

const createSubmission_dirs = (dir_path) => {
    try {
      // Create the directory synchronously
      fs.mkdirSync(dir_path);
      console.log(`Directory ${dir_path} created successfully!`);
    } catch (err) {
      console.error('Error creating directory:', err.message);
    }
}
const dir_paths = []
for(let i = 1; i<=13; i++){
  dir_paths.push(`./part${i}`)
}

dir_paths.map(createSubmission_dirs)
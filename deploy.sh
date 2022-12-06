#!/bin/bash

cd ../dev
npm run build
cd ../prod

git checkout -B master

mkdir -p dist && cp -r ../dev/dist/* dist/
mkdir -p static && cp -r ../dev/static/* static/
cp ../dev/package.json package.json

# npm pkg delete devDependencies
npx json -f package.json -I -e "delete this.scripts.prebuild"
npx json -f package.json -I -e "delete this.scripts.build"
npx json -f package.json -I -e "delete this.scripts.clean"
npx json -f package.json -I -e "delete this.scripts['start:dev']"
npx json -f package.json -I -e "delete this.scripts['start:debug']"
npx json -f package.json -I -e "delete this.scripts.prestart"
npx json -f package.json -I -e "delete this.scripts.prestart"
npx json -f package.json -I -e "delete this.scripts['test:dev']"
npx json -f package.json -I -e "delete this.scripts.test"
npx json -f package.json -I -e "delete this.scripts.prod"
npx json -f package.json -I -e "delete this.devDependencies"

echo 'Production build imported successfuly'

git add .
git commit -m "update production branch"
git push -u origin main
echo 'Production branch updated'

npm install
echo 'Install production dependencies'

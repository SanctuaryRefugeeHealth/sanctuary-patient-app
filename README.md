## Development

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Deployment

### Prerequisites

1. [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
2. Create your secret access key on the AWS console under IAM. Securely record the ID and secret.
3. `aws configure`, using the ID and secret from above. Use `ca-central-1` as the default region.
4. Create `.env.production` with lines `REACT_APP_API_HOST=https://sanctuary-api.happenate.com` and `REACT_APP_TOKEN_TIMEOUT=43200000`.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Uploading Operations

The upload script will default to our test bucket in S3 `test.happenate.com`.  In order to upload to a different bucket, it will need to be passed to the `make` command as a parameter `BUCKET=BUCKET_NAME` (eg. `BUCKET=sanctuary.happenate.com`)

### `make upload_dryrun`

Dryrun publish build to the S3 bucket.  Use this build to validate that the files being uploaded match your expectations.

### `make upload`

Publish build to the S3 bucket.

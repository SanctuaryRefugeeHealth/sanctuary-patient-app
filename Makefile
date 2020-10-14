# AWS credentials must be set via environment variable
# AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
# OR AWS_PROFILE

BUCKET := sanctuary.happenate.com

upload:
	@aws --profile sanctuary s3 sync ./build s3://${BUCKET}

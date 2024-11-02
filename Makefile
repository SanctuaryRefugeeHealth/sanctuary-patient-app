# AWS credentials must be set via environment variable
# AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
# OR AWS_PROFILE

BUCKET ?= test.happenate.com
dryrun :=

upload:
	@echo "Uploading files to $(BUCKET) with dryrun set to ${dryrun}"
	@aws --profile sanctuary s3 sync ./build s3://$(BUCKET) $(dryrun)


upload_dryrun:
	@echo "Dryrun uploading files to $(BUCKET)"
	$(MAKE) upload dryrun=--dryrun

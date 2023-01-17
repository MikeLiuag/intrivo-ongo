HELM_BINARY?=helm
KUBECONFIG?=~/.kube/config

UNIT_NAME?=ongo

ENVIRONMENT?=dev-us-east-1

CANARY_VALUES_FILE=./environments/${ENVIRONMENT}/canary-values-common.yaml
COMMON_VALUES_FILE=./environments/${ENVIRONMENT}/values-common.yaml
VALUES_FILE?=values.yaml

IMAGE_TAG?=latest

deployedFrom?=local
deployTime?=null
deployServer?=null
deployJobName?=null
deployJobNumber?=null

TEMPLATE_OUTPUT=./templated-${UNIT_NAME}-helm.yaml

template:
	${HELM_BINARY} template ${UNIT_NAME} \
	--values ${COMMON_VALUES_FILE} \
	--values ${VALUES_FILE} \
	--set deploymentLabels.deployedFrom=${deployedFrom} \
	--set deploymentLabels.deployTime=${deployTime} \
	--set deploymentLabels.deployServer=${deployServer} \
	--set deploymentLabels.deployJobName=${deployJobName} \
	--set deploymentLabels.deployJobNumber=${deployJobNumber} \
	./

apply:
	${HELM_BINARY} template ${UNIT_NAME} \
	--values ${COMMON_VALUES_FILE} \
	--values ${VALUES_FILE} \
	--set deploymentLabels.deployedFrom=${deployedFrom} \
	--set deploymentLabels.deployTime=${deployTime} \
	--set deploymentLabels.deployServer=${deployServer} \
	--set deploymentLabels.deployJobName=${deployJobName} \
	--set deploymentLabels.deployJobNumber=${deployJobNumber} \
	./ > ${TEMPLATE_OUTPUT}
	kubectl apply -f ${TEMPLATE_OUTPUT} -n app

delete:
	${HELM_BINARY} template ${UNIT_NAME} \
	--values ${COMMON_VALUES_FILE} \
	--values ${VALUES_FILE} \
	--set deploymentLabels.deployedFrom=${deployedFrom} \
	--set deploymentLabels.deployTime=${deployTime} \
	--set deploymentLabels.deployServer=${deployServer} \
	--set deploymentLabels.deployJobName=${deployJobName} \
	--set deploymentLabels.deployJobNumber=${deployJobNumber} \
	./ > ${TEMPLATE_OUTPUT}
	kubectl delete -f ${TEMPLATE_OUTPUT} -n app

install:
	${HELM_BINARY} install ongo ../ongo -n app \
	--values ${COMMON_VALUES_FILE} \
	--set image.tag=${IMAGE_TAG}

uninstall:
	${HELM_BINARY} uninstall ongo -n app

upgrade:
	${HELM_BINARY} upgrade ongo ../ongo -n app \
	--values ${COMMON_VALUES_FILE} \
	--set image.tag=${IMAGE_TAG}

upgrade-install-canary:
	${HELM_BINARY} upgrade --install ongo-canary ../ongo -n app \
	--values ${CANARY_VALUES_FILE} \
	--set image.tag=${IMAGE_TAG}

upgrade-install:
	${HELM_BINARY} upgrade --install ongo ../ongo -n app \
	--values ${COMMON_VALUES_FILE} \
	--set image.tag=${IMAGE_TAG}

import { App, CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { SlackChannelConfiguration } from 'aws-cdk-lib/aws-chatbot';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const topic = new Topic(this, 'CDKMonitorTopic', {
      topicName: 'cdk-monitor',
    });

    new SlackChannelConfiguration(this, 'CDKMonitorChannel', {
      slackWorkspaceId: 'T03L7TWLH09',
      slackChannelId: 'C03NVUV1F3P',
      slackChannelConfigurationName: 'cdk-monitor',
      notificationTopics: [topic],
    });

    new CfnOutput(this, 'TopicArn', {
      value: topic.topicArn,
      exportName: 'cdk-monitor-topic',
    });
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'cdk-monitor-dev', { env: devEnv });
// new MyStack(app, 'cdk-monitor-prod', { env: prodEnv });

app.synth();
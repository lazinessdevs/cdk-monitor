import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { MyStack } from '../src/main';

test('Snapshot', () => {
  const app = new App();
  const stack = new MyStack(app, 'test');

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});

test('topic name', () => {
  const app = new App();
  const stack = new MyStack(app, 'test');

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::SNS::Topic', {
    TopicName: 'cdk-monitor',
  });
});

test('slack channel name', () => {
  const app = new App();
  const stack = new MyStack(app, 'test');

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Chatbot::SlackChannelConfiguration', {
    ConfigurationName: 'cdk-monitor',
  });
});
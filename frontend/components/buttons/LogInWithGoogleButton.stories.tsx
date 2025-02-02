import LogInWithGoogleButton from "./LogInWithGoogleButton";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta = {
  title: "StartButton",
  component: LogInWithGoogleButton,
  args: { onClick: fn() },
} as Meta<typeof LogInWithGoogleButton>;

export default meta;

type Story = StoryObj<typeof LogInWithGoogleButton>;

export const RegisterForm: Story = {
  args: {
    register: true,
  },
};

export const LoginForm: Story = {
  args: {
    register: false,
  },
};

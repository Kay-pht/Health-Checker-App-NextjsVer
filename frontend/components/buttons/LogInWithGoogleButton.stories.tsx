import LogInWithGoogleButton from "./LogInWithGoogleButton";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, within } from "@storybook/test";

const meta = {
  title: "LogInWithGoogleButton",
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

export const Testing: Story = {
  args: {
    register: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    // button.click();
    await expect(button).toHaveTextContent("Googleでログイン");
    // await userEvent.click(button);
    // await expect();
  },
};

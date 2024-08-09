/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

const WelcomeEmail = ({ username = "Steve" }: WelcomeEmailProps) => {
  const previewText = `Welcome to Xanflis, ${username}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 w-[465px] p-5">
            <Section className="mt-8">
              <Img
                src={`${baseUrl}/static/example-logo.png`}
                width="80"
                height="80"
                alt="Logo Example"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-8 p-0 text-center text-2xl font-normal">
              Welcome to <strong>Xanflis</strong>, {username}!
            </Heading>
            <Text className="text-sm">Hello {username},</Text>
            <Text className="text-sm">
              We're excited to have you onboard at <strong>Xanflis</strong>. We
              hope you enjoy your journey with us. If you have any questions or
              need assistance, feel free to reach out.
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#00A3FF] px-4 py-2 text-center text-xs font-semibold text-white no-underline"
                href={`${baseUrl}`}
              >
                Get Started
              </Button>
            </Section>
            <Text className="text-sm">
              Cheers,
              <br />
              The Southlike Software Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

interface WelcomeEmailProps {
  username?: string;
}

const baseUrl = process.env.URL
  ? `https://${process.env.URL}`
  : "http://localhost:3000";

export default WelcomeEmail;

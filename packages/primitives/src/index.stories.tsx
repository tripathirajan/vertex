import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Flex,
  Button,
  VisuallyHidden,
  Portal,
  FocusScope,
  RovingFocusGroup,
  FocusItem,
  Stack,
  Heading,
  Text,
} from './index';

const meta: Meta = {
  title: 'Primitives/Vertex Primitives',
  component: Box,
  tags: ['autodocs'],
};

export default meta;

export const Layout: StoryObj = {
  render: () => (
    <Stack style={{ gap: '20px' }}>
      <Box style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <Heading as="h3">Box Primitive</Heading>
        <Text>A simple box with padding and background.</Text>
      </Box>

      <Flex style={{ gap: '10px', alignItems: 'center' }}>
        <Box style={{ width: '50px', height: '50px', backgroundColor: '#007bff' }} />
        <Box style={{ width: '50px', height: '50px', backgroundColor: '#28a745' }} />
        <Box style={{ width: '50px', height: '50px', backgroundColor: '#dc3545' }} />
        <Text>Flex container with gap and alignment.</Text>
      </Flex>
    </Stack>
  ),
};

export const Forms: StoryObj = {
  render: () => (
    <Stack style={{ gap: '10px' }}>
      <Button variant="primary">Primary Button</Button>
      <Button as="a" href="#" style={{ textDecoration: 'none', color: '#007bff' }}>
        Polymorphic Link Button
      </Button>
    </Stack>
  ),
};

export const Accessibility: StoryObj = {
  render: () => (
    <Box>
      <Text>There is a visually hidden element below this text.</Text>
      <VisuallyHidden>This text is only visible to screen readers.</VisuallyHidden>
    </Box>
  ),
};

const OverlayStory = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Box>
      <Button onClick={() => setIsOpen(!isOpen)}>Toggle Portal</Button>
      {isOpen && (
        <Portal>
          <Box
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              padding: '20px',
              backgroundColor: '#333',
              color: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            I am rendered in a Portal!
          </Box>
        </Portal>
      )}
    </Box>
  );
};

export const Overlay: StoryObj = {
  render: () => <OverlayStory />,
};

export const FocusManagement: StoryObj = {
  render: () => (
    <Stack style={{ gap: '20px' }}>
      <Box>
        <Heading as="h4" style={{ marginBottom: '10px' }}>Roving Focus Group</Heading>
        <RovingFocusGroup orientation="horizontal">
          <Flex style={{ gap: '8px' }}>
            <FocusItem value="1">
              <Button style={{ padding: '8px 16px', border: '1px solid #ccc' }}>Item 1</Button>
            </FocusItem>
            <FocusItem value="2">
              <Button style={{ padding: '8px 16px', border: '1px solid #ccc' }}>Item 2</Button>
            </FocusItem>
            <FocusItem value="3">
              <Button style={{ padding: '8px 16px', border: '1px solid #ccc' }}>Item 3</Button>
            </FocusItem>
          </Flex>
        </RovingFocusGroup>
        <Text style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
          Use Arrow keys to navigate between buttons.
        </Text>
      </Box>

      <Box>
        <Heading as="h4" style={{ marginBottom: '10px' }}>Focus Scope (Trapped)</Heading>
        <FocusScope trapped style={{ padding: '20px', border: '2px solid #007bff', borderRadius: '8px' }}>
          <Stack style={{ gap: '10px' }}>
            <Text>Focus is trapped inside this box.</Text>
            <input placeholder="Input 1" style={{ padding: '8px', border: '1px solid #ccc' }} />
            <input placeholder="Input 2" style={{ padding: '8px', border: '1px solid #ccc' }} />
            <Button style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff' }}>
              Action
            </Button>
          </Stack>
        </FocusScope>
      </Box>
    </Stack>
  ),
};

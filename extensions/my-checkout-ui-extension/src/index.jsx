import React, { useState, useEffect } from 'react';
import {
  BlockStack,
  InlineLayout,
  Spinner,
  render,
  Text,
  useSettings,
  useExtensionApi,
  Image,
  Modal,
  View,
  Button,
  Heading,
} from '@shopify/checkout-ui-extensions-react';

// Set the entry points for the extension
render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [vsxInCart, setVsxInCart] = useState(false);

  const shopApi = useExtensionApi();
  const { presentmentLines } = shopApi;

  useEffect(() => {
    setVsxInCart(
      presentmentLines.current.some((item) => item.title.includes('VSX'))
    );
    setIsLoading(false);
  }, []);

  // Use the merchant-defined settings to retrieve the extension's content
  const { active } = useSettings();

  // Set a default status for the banner if a merchant didn't configure the banner in the checkout editor
  const showBanner = active ?? true;

  if (isLoading) {
    return (
      <BlockStack inlineAlignment="start">
        <Spinner />
      </BlockStack>
    );
  }

  if (showBanner) {
    if (vsxInCart) {
      return (
        <InlineLayout
          columns={['20%', 'fill']}
          blockAlignment="center"
          spacing="large400"
          padding="base"
        >
          <Image source="https://cdn.shopify.com/s/files/1/0791/7866/2207/t/3/assets/klarna-logo.png" />
          <Text size="extraLarge">
            Wanna use Rent to Own? Choose{' '}
            <Text emphasis="bold" size="extraLarge">
              Klarna
            </Text>{' '}
            at final checkout
          </Text>
        </InlineLayout>
      );
    }

    return (
      <>
        <InlineLayout
          columns={['25%', 'fill', '20%']}
          blockAlignment="center"
          spacing="base"
          padding="base"
        >
          <View position={{ type: 'absolute' }}>
            <Image source="https://cdn.shopify.com/s/files/1/0266/1649/6190/t/1/assets/splitit-banner-shopify.jpg" />
          </View>
          <View></View>
          <View>
            <Text size="base" appearance="monochrome">
              For <Text emphasis="bold">Rent to Own</Text> Choose Splitit Option
              at the Payment Method Section
            </Text>
          </View>
          <Button
            overlay={
              <Modal id="my-modal">
                <Image source="https://cdn.shopify.com/s/files/1/0266/1649/6190/t/1/assets/Splitit-banner-drums.png" />
              </Modal>
            }
            kind="secondary"
            appearance="monochrome"
          >
            See More
          </Button>
        </InlineLayout>
        <InlineLayout
          columns={['20%', 'fill']}
          blockAlignment="center"
          spacing="large400"
          padding="base"
        >
          <Image source="https://cdn.shopify.com/s/files/1/0791/7866/2207/t/3/assets/logo.svg" />
          <Text size="extraLarge">
            For Rent to Own Choose{' '}
            <Text emphasis="bold" size="extraLarge">
              Splitit
            </Text>{' '}
            Option at the Payment Method Section
          </Text>
        </InlineLayout>
      </>
    );
  }
  return null;
}

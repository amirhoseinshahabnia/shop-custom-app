import React, { useState, useEffect } from 'react';
import {
  render,
  Text,
  BlockStack,
  Spinner,
  useSettings,
  useExtensionApi,
} from '@shopify/checkout-ui-extensions-react';

// Set the entry points for the extension
render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [vsxInCart, setVsxInCart] = useState(false);
  const { title } = useSettings();

  const shopApi = useExtensionApi();
  const { cost, presentmentLines } = shopApi;
  console.log('shop api', shopApi);

  useEffect(() => {
    setVsxInCart(
      presentmentLines.current.some((item) => item.title.includes('VSX'))
    );
    setIsLoading(false);
  }, []);

  const monthlyPrice = (cost.totalAmount.current.amount / 12).toFixed(2);

  if (isLoading) {
    return (
      <BlockStack inlineAlignment="end">
        <Spinner />
      </BlockStack>
    );
  }

  if (!vsxInCart) {
    return (
      <BlockStack inlineAlignment="end">
        <Text size="small">
          {title} - ${monthlyPrice}/month
        </Text>
      </BlockStack>
    );
  }

  return null;
}

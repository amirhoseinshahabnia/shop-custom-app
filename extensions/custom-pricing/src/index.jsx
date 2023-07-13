import React, { useState } from 'react';
import {
  render,
  Text,
  BlockStack,
  useSettings,
  useExtensionApi,
} from '@shopify/checkout-ui-extensions-react';

// Set the entry points for the extension
render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const [vsxInCart, setVsxInCart] = useState(true);
  const { title } = useSettings();

  const shopApi = useExtensionApi();
  const { cost, presentmentLines } = shopApi;
  console.log('shop api', shopApi);

  if (presentmentLines.current.length !== 0) {
    console.log(presentmentLines.current);
    setVsxInCart(
      presentmentLines.current.some((item) => item.title.includes('VSX'))
    );
  }

  const monthlyPrice = (cost.totalAmount.current.amount / 12).toFixed(2);

  if (!vsxInCart) {
    return (
      <BlockStack inlineAlignment="end">
        <Text size="small">
          {title}: ${monthlyPrice}/month
        </Text>
      </BlockStack>
    );
  }

  return null;
}

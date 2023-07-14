import React from 'react';
import {
  render,
  Banner,
  useSettings,
} from '@shopify/checkout-ui-extensions-react';

// Set the entry points for the extension
render('Checkout::Dynamic::Render', () => <App />);

function App() {
  // Use the merchant-defined settings to retrieve the extension's content
  const {
    title,
    description,
    collapsible,
    status: merchantStatus,
    active,
  } = useSettings();

  // Set a default status for the banner if a merchant didn't configure the banner in the checkout editor
  const status = merchantStatus ?? 'info';

  if (!!active) {
    return (
      <Banner title={title} status={status} collapsible={collapsible}>
        {description}
      </Banner>
    );
  }
  return null;
}

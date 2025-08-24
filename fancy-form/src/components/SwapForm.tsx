import { SwapOutlined } from '@ant-design/icons';
import {
    Alert,
    Button,
    Card,
    Divider,
    Form,
    InputNumber,
    Spin,
    Typography,
    message
} from 'antd';
import React, { useEffect, useState } from 'react';
import { PRICES } from '../constants';
import { type CurrencyOption, type SwapFormData } from '../types/currency';
import { calculateSwapAmount, createCurrencyOptions, getLatestPrices, validateSwapForm } from '../utils/currencyUtils';
import CurrencySelect from './CurrencySelect';

const { Title } = Typography;

// Proper number formatter that only adds commas to the integer part
const formatNumber = (value: any) => {
  if (!value) return '';
  const parts = value.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

const SwapForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [currencyOptions, setCurrencyOptions] = useState<CurrencyOption[]>([]);
  const [swapRate, setSwapRate] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadCurrencyData();
  }, []);

  const loadCurrencyData = async () => {
    try {
      setLoading(true);
      const prices = PRICES;
      const latestPrices = getLatestPrices(prices);
      const options = createCurrencyOptions(latestPrices);
      setCurrencyOptions(options);
    } catch (error) {
      message.error('Failed to load currency data');
    } finally {
      setLoading(false);
    }
  };

  const handleValuesChange = (changedValues: any, allValues: SwapFormData) => {
    // Clear errors when user makes changes
    if (Object.keys(changedValues).length > 0) {
      setErrors({});
    }

    // Calculate swap rate and to amount
    if (allValues.fromCurrency && allValues.toCurrency && allValues.fromAmount) {
      const fromCurrency = currencyOptions.find(opt => opt.value === allValues.fromCurrency);
      const toCurrency = currencyOptions.find(opt => opt.value === allValues.toCurrency);
      
      if (fromCurrency && toCurrency) {
        const rate = fromCurrency.price / toCurrency.price;
        setSwapRate(rate);
        
        const toAmount = calculateSwapAmount(
          allValues.fromAmount,
          fromCurrency.price,
          toCurrency.price
        );
        
        form.setFieldsValue({ toAmount: toAmount });
      }
    }
  };

  const handleSwap = () => {
    const values = form.getFieldsValue();
    
    const validation = validateSwapForm(values);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Simulate swap transaction
    message.loading('Processing swap...', 2);
    setTimeout(() => {
      message.success(`Successfully swapped ${values.fromAmount} ${values.fromCurrency} to ${values.toAmount} ${values.toCurrency}`);
      form.resetFields();
      setSwapRate(0);
    }, 2000);
  };

  const handleSwitchCurrencies = () => {
    const fromCurrency = form.getFieldValue('fromCurrency');
    const toCurrency = form.getFieldValue('toCurrency');
    const fromAmount = form.getFieldValue('fromAmount');
    const toAmount = form.getFieldValue('toAmount');

    form.setFieldsValue({
      fromCurrency: toCurrency,
      toCurrency: fromCurrency,
      fromAmount: toAmount,
      toAmount: fromAmount
    });
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <div style={{ marginTop: '16px' }}>Loading currencies...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
          Currency Swap
        </Title>
        
        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleValuesChange}
          initialValues={{
            fromAmount: 0,
            toAmount: 0
          }}
        >
          {/* From Currency */}
          <Form.Item
            label="From"
            name="fromCurrency"
            validateStatus={errors.fromCurrency ? 'error' : ''}
            help={errors.fromCurrency}
          >
            <CurrencySelect
              options={currencyOptions}
              placeholder="Select currency to swap from"
              style={{ width: '100%' }}
            />
          </Form.Item>

          {/* From Amount */}
          <Form.Item
            label="Amount"
            name="fromAmount"
            validateStatus={errors.fromAmount ? 'error' : ''}
            help={errors.fromAmount}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="Enter amount"
              min={0}
              precision={6}
              formatter={formatNumber}
            />
          </Form.Item>

          {/* Switch Button */}
          <div style={{ textAlign: 'center', margin: '16px 0' }}>
            <Button
              type="text"
              icon={<SwapOutlined />}
              onClick={handleSwitchCurrencies}
              style={{ border: '1px dashed #d9d9d9' }}
            >
              Switch
            </Button>
          </div>

          {/* To Currency */}
          <Form.Item
            label="To"
            name="toCurrency"
            validateStatus={errors.toCurrency ? 'error' : ''}
            help={errors.toCurrency}
          >
            <CurrencySelect
              options={currencyOptions}
              placeholder="Select currency to swap to"
              style={{ width: '100%' }}
            />
          </Form.Item>

          {/* To Amount */}
          <Form.Item
            label="You will receive"
            name="toAmount"
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="0.00"
              min={0}
              precision={6}
              disabled
              formatter={formatNumber}
            />
          </Form.Item>

          {/* Swap Rate Display */}
          {swapRate > 0 && (
            <Alert
              message={`1 ${form.getFieldValue('fromCurrency')} = ${swapRate.toFixed(6)} ${form.getFieldValue('toCurrency')}`}
              type="info"
              showIcon
              style={{ marginBottom: '16px' }}
            />
          )}

          <Divider />

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              size="large"
              onClick={handleSwap}
              style={{ width: '100%' }}
              disabled={!form.getFieldValue('fromCurrency') || !form.getFieldValue('toCurrency')}
            >
              Swap Now
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SwapForm;

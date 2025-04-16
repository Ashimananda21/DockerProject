
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { CreditCard, ShieldCheck, CheckCircle, ChevronLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserAddress } from '@/types';

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'review' | 'confirmation'>('shipping');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  
  const [shippingAddress, setShippingAddress] = useState<UserAddress>({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phone: '',
  });
  
  const [billingAddress, setBillingAddress] = useState<UserAddress>({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phone: '',
  });

  const [sameBillingAddress, setSameBillingAddress] = useState(true);
  
  // Credit card details
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
  });

  const handleShippingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
    
    if (sameBillingAddress) {
      setBillingAddress({ ...billingAddress, [name]: value });
    }
  };

  const handleBillingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress({ ...billingAddress, [name]: value });
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSameBillingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSameBillingAddress(checked);
    if (checked) {
      setBillingAddress(shippingAddress);
    }
  };

  const validateShippingForm = () => {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'state', 'postalCode', 'phone'];
    for (const field of requiredFields) {
      if (!shippingAddress[field as keyof UserAddress]) {
        toast({
          title: "Missing Information",
          description: `Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const validatePaymentForm = () => {
    if (paymentMethod === 'credit_card') {
      // Basic validation for credit card
      if (!cardDetails.cardNumber || cardDetails.cardNumber.length < 16) {
        toast({
          title: "Invalid Card",
          description: "Please enter a valid card number",
          variant: "destructive",
        });
        return false;
      }
      
      if (!cardDetails.cardName) {
        toast({
          title: "Missing Information",
          description: "Please enter the name on your card",
          variant: "destructive",
        });
        return false;
      }
      
      if (!cardDetails.expiry || !/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
        toast({
          title: "Invalid Expiry Date",
          description: "Please enter expiry date in MM/YY format",
          variant: "destructive",
        });
        return false;
      }
      
      if (!cardDetails.cvc || cardDetails.cvc.length < 3) {
        toast({
          title: "Invalid CVC",
          description: "Please enter a valid security code",
          variant: "destructive",
        });
        return false;
      }
    }
    
    // Validate billing address
    if (!sameBillingAddress) {
      const requiredFields = ['firstName', 'lastName', 'address', 'city', 'state', 'postalCode'];
      for (const field of requiredFields) {
        if (!billingAddress[field as keyof UserAddress]) {
          toast({
            title: "Missing Information",
            description: `Please fill in your billing ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
            variant: "destructive",
          });
          return false;
        }
      }
    }
    
    return true;
  };

  const handleContinueToPayment = () => {
    if (validateShippingForm()) {
      setCurrentStep('payment');
      window.scrollTo(0, 0);
    }
  };

  const handleContinueToReview = () => {
    if (validatePaymentForm()) {
      setCurrentStep('review');
      window.scrollTo(0, 0);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessingOrder(true);
    
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success!
    setCurrentStep('confirmation');
    clearCart();
    setIsProcessingOrder(false);
    window.scrollTo(0, 0);
  };

  const shippingCost = shippingMethod === 'express' ? 9.99 : (total > 50 ? 0 : 4.99);
  const taxAmount = total * 0.07;
  const orderTotal = total + shippingCost + taxAmount;

  // Order Summary component that shows on all steps
  const OrderSummary = () => (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>
          {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-start">
              <div className="h-16 w-16 rounded overflow-hidden border flex-shrink-0">
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                <p className="text-sm font-medium">
                  ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            {shippingCost === 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Free Shipping</span>
                <span>-$0.00</span>
              </div>
            )}
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (currentStep === 'confirmation') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
            <p className="text-gray-600 mb-6">
              Your order has been received and is being processed. 
              A confirmation email has been sent to {user?.email || 'your email address'}.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold mb-4">Order Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Order Details</h3>
                  <p className="text-sm text-gray-600">Order Number: #ORD12345</p>
                  <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Payment Method: {paymentMethod === 'credit_card' ? 'Credit Card' : 'PayPal'}</p>
                  <p className="text-sm text-gray-600">Total: ${orderTotal.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <p className="text-sm text-gray-600">{shippingAddress.firstName} {shippingAddress.lastName}</p>
                  <p className="text-sm text-gray-600">{shippingAddress.address}</p>
                  <p className="text-sm text-gray-600">{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}</p>
                  <p className="text-sm text-gray-600">{shippingAddress.country}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/account/orders">View Order</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <div className="flex items-center">
            <div className={`flex items-center ${currentStep === 'shipping' ? 'text-shopping-primary font-medium' : 'text-gray-500'}`}>
              <div className={`h-6 w-6 rounded-full flex items-center justify-center text-sm mr-2 ${currentStep === 'shipping' ? 'bg-shopping-primary text-white' : 'bg-gray-200'}`}>
                1
              </div>
              Shipping
            </div>
            <div className="h-px bg-gray-300 w-8 mx-2"></div>
            <div className={`flex items-center ${currentStep === 'payment' ? 'text-shopping-primary font-medium' : 'text-gray-500'}`}>
              <div className={`h-6 w-6 rounded-full flex items-center justify-center text-sm mr-2 ${currentStep === 'payment' ? 'bg-shopping-primary text-white' : 'bg-gray-200'}`}>
                2
              </div>
              Payment
            </div>
            <div className="h-px bg-gray-300 w-8 mx-2"></div>
            <div className={`flex items-center ${currentStep === 'review' ? 'text-shopping-primary font-medium' : 'text-gray-500'}`}>
              <div className={`h-6 w-6 rounded-full flex items-center justify-center text-sm mr-2 ${currentStep === 'review' ? 'bg-shopping-primary text-white' : 'bg-gray-200'}`}>
                3
              </div>
              Review
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {currentStep === 'shipping' && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>
                    Enter your shipping details and delivery method
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={shippingAddress.firstName}
                          onChange={handleShippingAddressChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={shippingAddress.lastName}
                          onChange={handleShippingAddressChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={shippingAddress.address}
                        onChange={handleShippingAddressChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={shippingAddress.city}
                          onChange={handleShippingAddressChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={shippingAddress.state}
                          onChange={handleShippingAddressChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={shippingAddress.postalCode}
                          onChange={handleShippingAddressChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          name="country"
                          value={shippingAddress.country}
                          onChange={handleShippingAddressChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={shippingAddress.phone}
                          onChange={handleShippingAddressChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-4">Shipping Method</h3>
                      <RadioGroup 
                        value={shippingMethod} 
                        onValueChange={setShippingMethod}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2 border rounded-lg p-3">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Standard Shipping</p>
                                <p className="text-sm text-gray-500">Delivery in 3-5 business days</p>
                              </div>
                              <div>
                                {total > 50 ? (
                                  <span className="text-green-600 font-medium">Free</span>
                                ) : (
                                  <span>$4.99</span>
                                )}
                              </div>
                            </div>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 border rounded-lg p-3">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Express Shipping</p>
                                <p className="text-sm text-gray-500">Delivery in 1-2 business days</p>
                              </div>
                              <div>
                                <span>$9.99</span>
                              </div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        onClick={() => navigate('/cart')}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Return to Cart
                      </Button>
                      <Button 
                        onClick={handleContinueToPayment}
                        className="bg-shopping-primary hover:bg-shopping-primary/90"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {currentStep === 'payment' && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>
                    Enter your payment details securely
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Payment Method</h3>
                      <Tabs defaultValue="credit_card" onValueChange={setPaymentMethod}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="credit_card">Credit Card</TabsTrigger>
                          <TabsTrigger value="paypal">PayPal</TabsTrigger>
                        </TabsList>
                        <TabsContent value="credit_card" className="space-y-6 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <div className="relative">
                              <Input
                                id="cardNumber"
                                name="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={cardDetails.cardNumber}
                                onChange={handleCardDetailsChange}
                                required
                              />
                              <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input
                              id="cardName"
                              name="cardName"
                              placeholder="John Doe"
                              value={cardDetails.cardName}
                              onChange={handleCardDetailsChange}
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input
                                id="expiry"
                                name="expiry"
                                placeholder="MM/YY"
                                value={cardDetails.expiry}
                                onChange={handleCardDetailsChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input
                                id="cvc"
                                name="cvc"
                                placeholder="123"
                                value={cardDetails.cvc}
                                onChange={handleCardDetailsChange}
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <ShieldCheck className="h-4 w-4" />
                            <span>Your payment information is secure and encrypted</span>
                          </div>
                        </TabsContent>
                        <TabsContent value="paypal" className="pt-4">
                          <div className="flex flex-col items-center justify-center py-8">
                            <div className="mb-4">
                              <svg className="h-12" viewBox="0 0 101 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0)">
                                  <path d="M12.9 4.6H5.9C5.3 4.6 4.8 5.1 4.7 5.7L1.1 26.7C1 27.1 1.3 27.5 1.7 27.5H5.3C5.9 27.5 6.4 27 6.5 26.4L7.7 19.1C7.8 18.5 8.3 18 8.9 18H11.6C17.1 18 19.9 15.4 20.6 10.2C21 8 20.5 6.2 19.3 5C17.9 4.7 15.6 4.6 12.9 4.6ZM13.8 10.5C13.4 13.4 11.3 13.4 9.4 13.4H8.1L9.2 6.8C9.3 6.5 9.5 6.3 9.8 6.3H10.4C11.8 6.3 13 6.3 13.7 7.1C14.1 7.5 14.2 8.7 13.8 10.5Z" fill="#253B80"/>
                                  <path d="M38.3 10.3H34.7C34.4 10.3 34.2 10.5 34.1 10.8L33.9 12L33.7 11.7C32.8 10.4 30.8 10 28.9 10C24.5 10 20.9 13.2 20.2 17.7C19.8 20 20.5 22.1 22 23.5C23.3 24.8 25.3 25.3 27.5 25.3C31.1 25.3 33 23.2 33 23.2L32.8 24.4C32.7 24.8 33 25.2 33.4 25.2H36.7C37.3 25.2 37.8 24.7 37.9 24.1L40.1 11C40.2 10.7 39.8 10.3 39.4 10.3H38.3ZM34.3 17.9C33.9 20 32.2 21.4 29.9 21.4C28.7 21.4 27.8 21.1 27.2 20.5C26.6 19.9 26.4 19 26.6 18C27 15.9 28.7 14.4 31 14.4C32.1 14.4 33 14.7 33.7 15.3C34.3 16.1 34.5 17 34.3 17.9Z" fill="#179BD7"/>
                                  <path d="M59.9 10.3H56.3C56 10.3 55.6 10.5 55.4 10.8L49.9 18.9L47.6 11.2C47.5 10.7 47 10.3 46.5 10.3H43C42.5 10.3 42.2 10.7 42.3 11.2L46.3 23.8L42.6 29.1C42.3 29.5 42.6 30 43.1 30H46.7C47 30 47.3 29.8 47.5 29.6L61 11.2C61.3 10.8 61.1 10.3 59.9 10.3Z" fill="#179BD7"/>
                                  <path d="M71.5 4.6H64.5C63.9 4.6 63.4 5.1 63.3 5.7L59.7 26.7C59.6 27.1 59.9 27.5 60.3 27.5H63.9C64.5 27.5 65 27 65.1 26.4L66.3 19.1C66.4 18.5 66.9 18 67.5 18H70.2C75.7 18 78.5 15.4 79.2 10.2C79.6 8 79.1 6.2 77.9 5C76.5 4.7 74.2 4.6 71.5 4.6ZM72.4 10.5C72 13.4 69.9 13.4 68 13.4H66.8L67.9 6.8C68 6.5 68.2 6.3 68.5 6.3H69.1C70.5 6.3 71.7 6.3 72.4 7.1C72.8 7.5 72.9 8.7 72.4 10.5Z" fill="#253B80"/>
                                  <path d="M97 10.3H93.4C93.1 10.3 92.9 10.5 92.8 10.8L92.6 12L92.4 11.7C91.5 10.4 89.5 10 87.6 10C83.2 10 79.6 13.2 78.9 17.7C78.5 20 79.2 22.1 80.7 23.5C82 24.8 84 25.3 86.2 25.3C89.8 25.3 91.7 23.2 91.7 23.2L91.5 24.4C91.4 24.8 91.7 25.2 92.1 25.2H95.4C96 25.2 96.5 24.7 96.6 24.1L98.8 11C98.9 10.7 98.6 10.3 98.1 10.3H97ZM93.1 17.9C92.7 20 91 21.4 88.7 21.4C87.5 21.4 86.6 21.1 86 20.5C85.4 19.9 85.2 19 85.4 18C85.8 15.9 87.5 14.4 89.8 14.4C90.9 14.4 91.8 14.7 92.5 15.3C93.1 16.1 93.3 17 93.1 17.9Z" fill="#179BD7"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0">
                                    <rect width="100" height="32" fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <p className="text-gray-600 mb-6">
                              Click the button below to log in to your PayPal account and complete your purchase securely.
                            </p>
                            <Button className="bg-[#0070ba] hover:bg-[#003087]">
                              Continue with PayPal
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex items-center mb-4">
                        <input
                          id="sameBillingAddress"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-shopping-primary focus:ring-shopping-primary"
                          checked={sameBillingAddress}
                          onChange={handleSameBillingAddressChange}
                        />
                        <label htmlFor="sameBillingAddress" className="ml-2 block text-sm text-gray-700">
                          Billing address is the same as shipping address
                        </label>
                      </div>
                      
                      {!sameBillingAddress && (
                        <div className="space-y-4 pt-4">
                          <h3 className="font-medium">Billing Address</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="billingFirstName">First Name</Label>
                              <Input
                                id="billingFirstName"
                                name="firstName"
                                value={billingAddress.firstName}
                                onChange={handleBillingAddressChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billingLastName">Last Name</Label>
                              <Input
                                id="billingLastName"
                                name="lastName"
                                value={billingAddress.lastName}
                                onChange={handleBillingAddressChange}
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="billingAddress">Street Address</Label>
                            <Input
                              id="billingAddress"
                              name="address"
                              value={billingAddress.address}
                              onChange={handleBillingAddressChange}
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="billingCity">City</Label>
                              <Input
                                id="billingCity"
                                name="city"
                                value={billingAddress.city}
                                onChange={handleBillingAddressChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billingState">State</Label>
                              <Input
                                id="billingState"
                                name="state"
                                value={billingAddress.state}
                                onChange={handleBillingAddressChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billingPostalCode">Postal Code</Label>
                              <Input
                                id="billingPostalCode"
                                name="postalCode"
                                value={billingAddress.postalCode}
                                onChange={handleBillingAddressChange}
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="billingCountry">Country</Label>
                            <Input
                              id="billingCountry"
                              name="country"
                              value={billingAddress.country}
                              onChange={handleBillingAddressChange}
                              required
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep('shipping')}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Shipping
                      </Button>
                      <Button 
                        onClick={handleContinueToReview}
                        className="bg-shopping-primary hover:bg-shopping-primary/90"
                      >
                        Review Order
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {currentStep === 'review' && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                  <CardDescription>
                    Please review your order details before placing your order
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Shipping Information</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                          <p>{shippingAddress.address}</p>
                          <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}</p>
                          <p>{shippingAddress.country}</p>
                          <p>{shippingAddress.phone}</p>
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="font-medium">
                              {shippingMethod === 'express' ? 'Express Shipping' : 'Standard Shipping'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {shippingMethod === 'express' 
                                ? 'Delivery in 1-2 business days' 
                                : 'Delivery in 3-5 business days'}
                            </p>
                          </div>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-shopping-primary"
                            onClick={() => setCurrentStep('shipping')}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Payment Information</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          {paymentMethod === 'credit_card' ? (
                            <>
                              <p className="font-medium">Credit Card</p>
                              <p>Card ending in {cardDetails.cardNumber.slice(-4)}</p>
                              <p>{cardDetails.cardName}</p>
                              <p>Expires {cardDetails.expiry}</p>
                            </>
                          ) : (
                            <p className="font-medium">PayPal</p>
                          )}
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="font-medium">Billing Address</p>
                            <p>{billingAddress.firstName} {billingAddress.lastName}</p>
                            <p>{billingAddress.address}</p>
                            <p>{billingAddress.city}, {billingAddress.state} {billingAddress.postalCode}</p>
                            <p>{billingAddress.country}</p>
                          </div>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-shopping-primary"
                            onClick={() => setCurrentStep('payment')}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">Order Items</h3>
                      <div className="divide-y">
                        {items.map((item) => (
                          <div key={item.product.id} className="py-4 flex items-start">
                            <div className="h-16 w-16 rounded overflow-hidden border flex-shrink-0">
                              <img 
                                src={item.product.images[0]} 
                                alt={item.product.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              <p className="font-medium">
                                ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>${shippingCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax</span>
                          <span>${taxAmount.toFixed(2)}</span>
                        </div>
                        {shippingCost === 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Free Shipping</span>
                            <span>-$0.00</span>
                          </div>
                        )}
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>${orderTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep('payment')}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Payment
                      </Button>
                      <Button 
                        onClick={handlePlaceOrder}
                        className="bg-shopping-primary hover:bg-shopping-primary/90"
                        disabled={isProcessingOrder}
                      >
                        {isProcessingOrder ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Processing...</span>
                          </div>
                        ) : (
                          <span>Place Order</span>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="lg:w-1/3">
            <OrderSummary />
            
            <div className="mt-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <ShieldCheck className="h-4 w-4 mr-2 text-shopping-primary" />
                    <span>Safe & Secure Checkout</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;

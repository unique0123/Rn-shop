import { Stack } from "expo-router"
import { ToastProvider } from 'react-native-toast-notifications'
import { TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import AuthProvider from "../providers/auth-provider"
import { QueryClientProvider } from "@tanstack/react-query"
import QueryProvider from "../providers/query-provider"


export default function RootLayout() {
    return (
<ToastProvider>
        <AuthProvider>
        <QueryProvider>
                        <Stack>
            <Stack.Screen name="(shop)"
             options={{headerShown: false, title: 'shop'}}
            />

            <Stack.Screen name="categories"
             options={{headerShown: false, title: 'categories'}}
            />

            <Stack.Screen name="product"
            //  options={{headerShown: false, title: 'products'}}
                options={({ navigation }) => ({
                    headerShown: true,
                    title: 'product details',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name='arrow-back' size={24} color='black' />
                        </TouchableOpacity>
                    ),
                })}
            />

            <Stack.Screen name="cart"
             options={{presentation: 'modal' , title: 'shopping cart'}}
            />

            <Stack.Screen name="auth"
             options={{headerShown: true,}}
            />
        </Stack>
        </QueryProvider>
        </AuthProvider>
</ToastProvider>
               

    
        
    )
}
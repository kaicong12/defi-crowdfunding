"use client"

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { 
    Box,
    Button, 
    Flex, 
    VStack, 
    Drawer,  
    Portal,
    useDisclosure
} from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faFolderOpen, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { WalletModal } from "@/components/ui/WalletModal";

export const SideBar = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => setIsOpen(!isOpen);
    const { open: isWalletModalOpen, onOpen: onOpenWalletModal, onClose: onCloseWalletModal } = useDisclosure();

    return (
        <Flex>
            <Box height="100vh" bg="white">
                <Button variant="outline" size="sm" onClick={toggleDrawer}>
                    Open Drawer
                </Button>
            </Box>
            <Drawer.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} placement="start">
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Header>
                                <Drawer.Title>Navigation</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body>
                                <VStack h="full" p={4} align="start">
                                    <Button
                                        justifyContent="flex-start"
                                        w="full"
                                        onClick={() => {
                                            router.push("/home");
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faHouse} />
                                        Home
                                    </Button>
                                    <Button
                                        justifyContent="flex-start"
                                        w="full"
                                        onClick={() => {
                                            router.push("/projects");
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faFolderOpen} />
                                        My Projects
                                    </Button>
                                    <Box mt="auto">
                                        <Button
                                            w="full"
                                            justifyContent="flex-start"
                                            onClick={onOpenWalletModal} // Replace with disconnectWallet when implemented
                                        >
                                            <FontAwesomeIcon icon={faSignOutAlt} />
                                            Connect Wallet
                                        </Button>
                                        <Button
                                            w="full"
                                            justifyContent="flex-start"
                                            onClick={toggleDrawer} // Replace with disconnectWallet when implemented
                                        >
                                            <FontAwesomeIcon icon={faSignOutAlt} />
                                            Sign Out
                                        </Button>
                                    </Box>
                                </VStack>
                            </Drawer.Body>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>
            {children}

            <WalletModal isOpen={isWalletModalOpen} onClose={onCloseWalletModal} />
        </Flex>
        
    );
}
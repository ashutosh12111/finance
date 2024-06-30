import React, { useEffect, useState } from 'react';
import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

export const useConfirm = (title: string, description: string): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<any>(null);

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve })
    })
    const handleClose = () => {
        setPromise(null)
    }
    const handleConfirm = () => {
        promise.resolve(true);
        handleClose()
    }
    const handleCancel = () => {
        promise.resolve(null)
        setPromise(null)
    }

    // useEffect(() => {
    //     console.log(promise)
    // }, [promise])

    const ConfirmDialog = () => (
        <Dialog open={promise !== null} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button onClick={handleCancel} variant="outline">Cancel</Button>
                    <Button onClick={handleConfirm} >Confirm</Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return [ConfirmDialog, confirm];
};

export default useConfirm;

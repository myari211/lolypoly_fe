import { useState, useEffect } from 'react';
import { get } from '../../../Configuration/Services/API/apiHelper';
import LoadingImage from '../../Molecules/Loading';
import TableAtom from '../../Atom/TableAtom';

const PromotionBanner = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        const getBanner = async() => {
            setLoading(true);
            const response = await get("/admin/banner/list");

            if(response.data.status == true) {
                setData(response.data.data);
            }

            setLoading(false);
        }

        getBanner();
    }, []);

    return(
        <>
            {!loading ? (
                <>
                    <TableAtom 
                        
                        form={false}
                    />
                </>
            ) : (
                <LoadingImage />
            )}
        </>
    )
}

export default PromotionBanner;
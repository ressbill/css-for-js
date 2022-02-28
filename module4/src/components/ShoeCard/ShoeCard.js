import React from 'react';
import styled from 'styled-components/macro';

import {COLORS, WEIGHTS} from '../../constants';
import {formatPrice, pluralize, isNewShoe} from '../../utils';
import Spacer from '../Spacer';


const VARIANTS = {
    'new-release': {
        "--backgroundColor": COLORS.secondary,
        "--color": COLORS.white,
    },
    'on-sale': {
        "--backgroundColor": COLORS.primary,
        "--color": COLORS.white,
    }
}

const ShoeCard = ({
                      slug,
                      name,
                      imageSrc,
                      price,
                      salePrice,
                      releaseDate,
                      numOfColors,
                  }) => {
    // There are 3 variants possible, based on the props:
    //   - new-release
    //   - on-sale
    //   - default
    //
    // Any shoe released in the last month will be considered
    // `new-release`. Any shoe with a `salePrice` will be
    // on-sale. In theory, it is possible for a shoe to be
    // both on-sale and new-release, but in this case, `on-sale`
    // will triumph and be the variant used.
    // prettier-ignore
    const variant = typeof salePrice === 'number'
        ? 'on-sale'
        : isNewShoe(releaseDate)
            ? 'new-release'
            : 'default'

    const styles = VARIANTS[variant];

    return (
        <Link href={`/shoe/${slug}`}>
            <Wrapper>
                <ImageWrapper>
                    <Image alt="" src={imageSrc}/>
                </ImageWrapper>
                <Spacer size={12}/>
                <Row>
                    <Name>{name}</Name>
                    <Price>{formatPrice(price)}</Price>
                    <SalePrice> {salePrice && formatPrice(salePrice)}</SalePrice>
                </Row>
                <Row>
                    <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
                </Row>
                <SalesFlag
                    style={styles}>{variant === 'on-sale' ? 'Sale' : variant === 'new-release' ? 'Just Released!' : ''}</SalesFlag>
            </Wrapper>
        </Link>
    );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`

`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  position: absolute;
  right: 0;
  top: calc(1rem + 8px);
  display: block;
`;

const SalesFlag = styled.span`
  background-color: var(--backgroundColor);
  color: var(--color);
  position: absolute;
  top: 8px;
  right: -8px;
  width: fit-content;
  padding: 4px 6px;

`

export default ShoeCard;

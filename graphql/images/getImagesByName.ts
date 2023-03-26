import { gql } from "@apollo/client";

export const findImages = gql`
    query available_images($text: String){
        available_images(
          text: $text
        )
    }
`;
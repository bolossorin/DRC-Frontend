import { gql } from "@apollo/client";

export const getQueues = gql`
    query available_queues($computeType: ComputeTypeEnum!, $region: String!){
        available_queues(
          text: "",
          compute_type: $computeType,
          region: $region
        ) {
            free
            queue
        }
    }
`;